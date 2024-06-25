from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Course, Lesson, Group
from users.models import User
from .serializers import CourseSerializer, LessonSerializer, GroupSerializer, UserSerializer



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        course_id = self.request.query_params.get('course')
        if course_id is not None:
            queryset = queryset.filter(course_id=course_id)
        return queryset

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


@api_view(['GET'])
def get_course_lesson_data(request, id):
    try:
        course = Course.objects.get(id=id)
        lesson = course.lesson_set.all().count() + 1
        return Response({'ok': True, 'data': {'id': course.pk, 'name': course.name, 'lesson': lesson}})
    except:
        return Response({'ok': False, 'error': 'Something went very wrong'})
    

@api_view(['GET'])
def get_next_prev(request, id):
    try:
        lesson = Lesson.objects.get(id=id)
        lessons = Lesson.objects.filter(course=lesson.course).order_by('id')
        lesson_ids = list(lessons.values_list('id', flat=True))
        current_index = lesson_ids.index(id)

        previous_id = lesson_ids[current_index - 1] if current_index > 0 else None
        next_id = lesson_ids[current_index + 1] if current_index < len(lesson_ids) - 1 else None

        return Response({'ok': True, 'data': {'previous': previous_id, 'next': next_id}})
    except:
        return Response({'ok': False, 'error': 'Something went wrong'})
