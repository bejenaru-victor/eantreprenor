from django.contrib import admin
from .models import Course, Lesson, SharedFile, Purchase, Payment, Subscription

admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(SharedFile)
admin.site.register(Purchase)
admin.site.register(Payment)
admin.site.register(Subscription)
