from django.db import models
from datetime import datetime
from django.utils import timezone
from .utils import process_image


class Course(models.Model):
    author = models.ForeignKey("users.User", verbose_name=(""), null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(max_length=1000, null=False, blank=False)
    image = models.ImageField(upload_to='course_images/', null=True, blank=True)
    published = models.BooleanField(null=False, blank=True, default=False)

    def save(self, *args, **kwargs):
        try:
            this = Course.objects.get(id=self.id)
            if this.image != self.image:
                self.image = process_image(self.image, width=1000)
        except Course.DoesNotExist:
            if self.image:
                self.image = process_image(self.image, width=1000)
        super(Course, self).save(*args, **kwargs)


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=False, blank=False)
    video_link = models.CharField(max_length=300, null=False, blank=False, default='')
    description = models.TextField(max_length=20000, null=False, blank=False)
    order = models.PositiveSmallIntegerField(null=False, blank=True, default=0)


class Subscriber_Record(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    progress = models.ManyToManyField(Lesson)
    active = models.BooleanField(null=False, blank=True, default=True)


class Purchase(models.Model):
    user = models.ForeignKey('users.User', related_name='purchases', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='purchases', on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)


class Subscription(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    payment = models.ForeignKey('api.Payment', on_delete=models.SET_NULL, null=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def is_active(self):
        return self.end_date > timezone.now()


class Payment(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    stripe_charge_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)


class Group(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    users = models.ManyToManyField("users.User", blank=True, related_name='learning_group')
    created_at = models.DateTimeField(auto_now_add=True)


class SharedFile(models.Model):
    file = models.FileField(upload_to='group_files/', null=False, blank=False)
    group = models.ForeignKey(Group, related_name='shared_files', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.file.name} in group {self.group.name}'
