from rest_framework.decorators import action
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from django.core.exceptions import ObjectDoesNotExist

from django.conf import settings
import stripe

from .permissions import HasPurchasedCourse
from .models import Course, Lesson, Group, SharedFile, Purchase
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
    permission_classes = [IsAuthenticated, HasPurchasedCourse]

    def get_queryset(self):
        queryset = super().get_queryset()
        course_id = self.request.query_params.get('course')
        if course_id is not None:
            queryset = queryset.filter(course_id=course_id)
        return queryset
    
    def get_permissions(self):
        if 'course' in self.request.query_params:
            return []
        else:
            return [IsAuthenticated(), HasPurchasedCourse()]

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
        return Response({'ok': True, 'data': {'id': course.pk, 'name': course.name, 'lesson': lesson}})
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
            price = data.get('price')
            course = data.get('course')
            user = data.get('user')

            try:
                Purchase.objects.get(user=user, course=course)
                return Response({"error": "User have bought the course"}, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                pass

            if price is None:
                return Response({"error": "Amount is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            if user is None or not user:
                return Response({"error": "User is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            intent = stripe.PaymentIntent.create(
                amount=int(price),
                currency='ron',
                metadata={
                    'integration_check': 'accept_a_payment',
                    'user': user,
                    'course': course,
                },
            )

            return Response({
                'client_secret': intent['client_secret']
            })
        except Exception as e:
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
        except ValueError as e:
            # Invalid payload
            return Response({'error': str(e)}, status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature
            return Response({'error': str(e)}, status=400)

        # Handle the event
        if event['type'] == 'payment_intent.succeeded':
            payment_intent = event['data']['object']
            # Handle successful payment intent here
            print('testing something else', payment_intent['metadata'], payment_intent['metadata']['course'], payment_intent['metadata']['user'])
            if payment_intent['metadata']['course'] and payment_intent['metadata']['user']:
                try:
                    user = User.objects.get(id=payment_intent['metadata']['user'])
                    course = Course.objects.get(id=payment_intent['metadata']['course'])
                    p = Purchase(user=user, course=course)
                    p.save()
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
        if Purchase.objects.filter(user=user, course_id=course_id).exists():
            return Response({'owned': True})
        else:
            return Response({'owned': False})
