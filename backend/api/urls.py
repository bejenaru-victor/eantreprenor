from rest_framework import routers
from . import views


router = routers.SimpleRouter()
router.register(r'courses', views.CourseViewSet)

urlpatterns = router.urls + [
]
