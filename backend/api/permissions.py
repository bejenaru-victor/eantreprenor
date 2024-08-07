from rest_framework import permissions
from .models import Course
from .models import Purchase, Subscription

class HasPurchasedCourse(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        course = obj.course
        user = request.user
        
        # Check if the user has purchased the course
        if Purchase.objects.filter(user=user, course=course).exists():
            return True

        # Check if the user has an active subscription
        active_subscription = Subscription.objects.filter(user=user).latest('end_date')
        if active_subscription and active_subscription.is_active():
            return True

        return False
    

class IsCourseOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        # This permission only applies to POST requests
        if request.method != 'POST':
            return True

        # Get the course ID from the request data
        course_id = request.data.get('course')
        if not course_id:
            return False

        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return False

        # Check if the user is the owner of the course
        return course.author == request.user
