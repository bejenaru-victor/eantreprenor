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
