from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.SimpleRouter()
router.register(r'courses', views.CourseViewSet)
router.register(r'lessons', views.LessonViewSet)

urlpatterns = router.urls + [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    path('get-course-lesson-data/<int:id>/', views.get_course_lesson_data, name='get-course-lesson-data'),
    path('next_prev/<int:id>/', views.get_next_prev, name='get-next-prev'),
]
