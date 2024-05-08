from django.db import models
from datetime import datetime 


class Course(models.Model):
    author = models.ForeignKey("users.User", verbose_name=(""), null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(max_length=1000, null=False, blank=False)


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=False, blank=False)
    video = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(max_length=20000, null=False, blank=False)


class Subscriber_Record(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    progress = models.ManyToManyField(Lesson)
    active = models.BooleanField(null=False, blank=True, default=True)


class Payments(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    ammount = models.FloatField(null=False, blank=False)
    date = models.DateTimeField(null=False, blank=False, default=datetime.now)
    course = models.ForeignKey(Course, null=True, on_delete=models.SET_NULL)
