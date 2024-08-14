from rest_framework.decorators import action
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone

from datetime import timedelta

from django.conf import settings
import stripe

from .permissions import HasPurchasedCourse, IsCourseOwner
from .models import Course, Lesson, Group, SharedFile, Purchase, Payment, Subscription
from users.models import User
from .serializers import CourseSerializer, LessonSerializer, GroupSerializer, UserSerializer, BulkUploadSerializer, SharedFileSerializer



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        owned = self.request.query_params.get('owned', None)
        if owned is not None:
            user = self.request.user
            queryset = queryset.filter(purchases__user=user)
        return queryset

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def owned(self, request):
        user = request.user
        owned_courses = Course.objects.filter(purchases__user=user)
        serializer = self.get_serializer(owned_courses, many=True)
        return Response(serializer.data)

    
class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        course_id = self.request.query_params.get('course')
        if course_id is not None:
            queryset = queryset.filter(course_id=course_id)
        return queryset

    def get_permissions(self):
        if self.request.method == 'GET' and 'course' in self.request.query_params:
            self.permission_classes = []
        elif self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated, IsCourseOwner]
        else:
            self.permission_classes = [IsAuthenticated, HasPurchasedCourse]

        return [permission() for permission in self.permission_classes]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class SharedFileViewSet(viewsets.ModelViewSet):
    queryset = SharedFile.objects.all()
    serializer_class = SharedFileSerializer


@api_view(['GET'])
def get_course_lesson_data(request, id):
    try:
        course = Course.objects.get(id=id)
        lesson = course.lesson_set.all().count() + 1
        return Response({'ok': True, 'data': {'id': course.pk, 'name': course.name, 'lesson': lesson, 'author': course.author.pk}})
    except:
        return Response({'ok': False, 'error': 'Something went very wrong'})
    

@api_view(['GET'])
def get_next_prev(request, id):
    try:
        lesson = Lesson.objects.get(id=id)
        lessons = Lesson.objects.filter(course=lesson.course).order_by('id')
        lesson_ids = list(lessons.values_list('id', flat=True))
        current_index = lesson_ids.index(id)

        previous_id = lesson_ids[current_index - 1] if current_index > 0 else None
        next_id = lesson_ids[current_index + 1] if current_index < len(lesson_ids) - 1 else None

        return Response({'ok': True, 'data': {'previous': previous_id, 'next': next_id}})
    except:
        return Response({'ok': False, 'error': 'Something went wrong'})
    

@api_view(['GET'])
def get_user_files(request, id):
    try:
        user = User.objects.get(id=id)
        group = user.learning_group.all().first()
        files = group.shared_files.all()
        serializer = SharedFileSerializer(files, many=True)

        return Response({'ok': True, 'data': serializer.data})
    except:
        return Response({'ok': False, 'error': 'Something went very wrong'})

@api_view(['POST'])
def bulk_upload(request):
    serializer = BulkUploadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'files uploaded successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreatePaymentIntentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            course = data.get('course')
            user_id = data.get('user')
            subscription = data.get('subscription', False)
            price = data.get('price')  # For one-time payments

            # Validate the user
            if user_id is None or not user_id:
                return Response({"error": "User is required"}, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.get(id=user_id)  # Assuming you have a User model

            if subscription:
                # Check if a Stripe customer already exists with the user's email
                stripe_customers = stripe.Customer.list(email=user.email).data
                if stripe_customers:
                    customer = stripe_customers[0]
                else:
                    # Create a new Stripe customer if one does not exist
                    customer = stripe.Customer.create(
                        email=user.email,
                        metadata={'user_id': user.id}
                    )

                # Check if an active subscription already exists for this customer
                subscriptions = stripe.Subscription.list(customer=customer.id, status='active', limit=1).data

                if subscriptions:
                    return Response({"error": "User already has an active subscription"}, status=status.HTTP_400_BAD_REQUEST)

                # Create a new subscription
                subscription = stripe.Subscription.create(
                    customer=customer.id,
                    items=[{'price': 'price_1PmvZoGmKjmmayLGbUuiT4my'}],
                    metadata={
                        'user': str(user.id),
                        'course': str(course) if course else '',
                    },
                    payment_behavior='default_incomplete',
                    expand=['latest_invoice.payment_intent'],
                )

                return Response({
                    'subscription_id': subscription.id,
                    'client_secret': subscription.latest_invoice.payment_intent.client_secret
                })

            else:
                # Handle one-time payment logic
                try:
                    Purchase.objects.get(user=user, course=course)
                    return Response({"error": "User has already bought the course"}, status=status.HTTP_400_BAD_REQUEST)
                except ObjectDoesNotExist:
                    pass

                if price is None:
                    return Response({"error": "Amount is required"}, status=status.HTTP_400_BAD_REQUEST)

                intent = stripe.PaymentIntent.create(
                    amount=int(price),
                    currency='ron',
                    metadata={
                        'integration_check': 'accept_a_payment',
                        'user': str(user.id),
                        'course': str(course) if course else '',
                        'payment_type': 'one-time',
                    },
                )

                return Response({
                    'client_secret': intent['client_secret']
                })

        except stripe.error.StripeError as e:
            # Handle Stripe errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            # Handle other errors
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

stripe.api_key = settings.STRIPE_SECRET_KEY

endpoint_secret = 'whsec_W6g0RhhEr23gapXfTaxoWrfFpgp2Wak7'

class StripeWebhookView(APIView):
    def post(self, request, *args, **kwargs):
        payload = request.body
        event = None

        try:
            sig_header = request.META['HTTP_STRIPE_SIGNATURE']
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
            print(event)
        except ValueError as e:
            # Invalid payload
            return Response({'error': str(e)}, status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return Response({'error': str(e)}, status=400)
        
        event_type = event['type']
        data_object = event['data']['object']

        # Handle the event
        if event_type == 'payment_intent.succeeded':
            payment_intent = data_object
            metadata = payment_intent['metadata']
            print('this should be the metadata: ', metadata)
            user_id = metadata.get('user')
            course_id = metadata.get('course')
            payment_type = metadata.get('payment_type')

            if user_id:
                try:
                    user = User.objects.get(id=payment_intent['metadata']['user'])
                    amount = payment_intent['amount_received'] / 100
                    stripe_charge_id = payment_intent['id']

                    # Create the Payment record
                    payment = Payment.objects.create(
                        user=user,
                        stripe_charge_id=stripe_charge_id,
                        amount=amount
                    )

                    if payment_type == 'subscription':
                        # Create the Subscription record
                        Subscription.objects.create(
                            user=user,
                            payment=payment,
                            start_date=timezone.now(),
                            end_date=timezone.now() + timedelta(days=30)  # Example duration
                        )

                    else:
                        course = Course.objects.get(id=course_id)
                        Purchase.objects.create(user=user, course=course)

                except ObjectDoesNotExist:
                    Response({'success': False, 'error': 'Bad request. Specify the user and the course'})
            else:
                Response({'success': False, 'error': 'Bad request. No user or course specified'})
        # ... handle other event types
        else:
            print('Unhandled event type {}'.format(event['type']))

        return Response({'success': True})


class CourseOwnershipView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        user = request.user
        data = {'owned': False, 'subscribed': False}
        if Purchase.objects.filter(user=user, course_id=course_id).exists():
            data['owned'] = True
        
        elif Subscription.objects.filter(user=user).exists():
            latest_subscription = Subscription.objects.filter(user=user).latest('end_date')
            if latest_subscription.is_active():
                data['subscribed'] = True
        
        return Response(data)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def subscriptions(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the Stripe customer by email
        stripe_customers = stripe.Customer.list(email=user.email).data
        if not stripe_customers:
            return Response({'error': 'No Stripe customer found for this user'}, status=404)

        customer = stripe_customers[0]

        # Retrieve all subscriptions for the given customer
        subscriptions = stripe.Subscription.list(
            customer=customer.id,
            status='active',
            expand=['data.default_payment_method']
        )

        print(subscriptions)

        return Response(subscriptions)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_subscription(request):
    try:
        # Get the current authenticated user
        user = request.user

        # Retrieve the Stripe customer by email
        stripe_customers = stripe.Customer.list(email=user.email).data
        if not stripe_customers:
            return Response({'error': 'No Stripe customer found for this user'}, status=404)

        customer = stripe_customers[0]

        # Retrieve active subscriptions for the given customer
        subscriptions = stripe.Subscription.list(
            customer=customer.id,
            status='active',
            limit=1  # We expect only one active subscription
        ).data

        if not subscriptions:
            return Response({'error': 'No active subscription found for this user'}, status=404)

        # Cancel the active subscription
        subscription = subscriptions[0]
        canceled_subscription = stripe.Subscription.delete(subscription.id)

        return Response({'subscription': canceled_subscription})
    except stripe.error.StripeError as e:
        # Handle specific Stripe errors
        return Response({'error': str(e)}, status=400)
    except Exception as e:
        # Handle any other errors
        return Response({'error': str(e)}, status=500)