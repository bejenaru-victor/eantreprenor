from rest_framework import routers
from django.urls import path
from . import views


router = routers.SimpleRouter()
router.register(r'courses', views.CourseViewSet)

urlpatterns = router.urls + [
    path('get-course-lesson-data/<int:id>/', views.get_course_lesson_data, name='get-course-lesson-data'),
]
