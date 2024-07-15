from rest_framework import permissions
from .models import Course
from .models import Purchase

class HasPurchasedCourse(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        course = obj.course
        user = request.user
        
        return Purchase.objects.filter(user=user, course=course).exists()
