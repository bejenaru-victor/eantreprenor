from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet)
router.register(r'courses', views.CourseViewSet)
router.register(r'lessons', views.LessonViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'files', views.SharedFileViewSet)

urlpatterns = router.urls + [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    path('get-course-lesson-data/<int:id>/', views.get_course_lesson_data, name='get-course-lesson-data'),
    path('course_ownership/<int:course_id>/', views.CourseOwnershipView.as_view(), name='course-ownership'),
    path('next_prev/<int:id>/', views.get_next_prev, name='get-next-prev'),
    path('user/<int:id>/files/', views.get_user_files, name='user-files'),
    path('bulk-upload/', views.bulk_upload, name='bulk-upload'),

    path('create-payment-intent/', views.CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('webhook/', views.StripeWebhookView.as_view(), name='stripe-webhook'),
]
