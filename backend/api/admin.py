from django.contrib import admin
from .models import Course, Lesson, SharedFile, Purchase

admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(SharedFile)
admin.site.register(Purchase)
