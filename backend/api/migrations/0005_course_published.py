# Generated by Django 4.2.11 on 2024-06-20 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_lesson_video_lesson_order_lesson_video_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='published',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]