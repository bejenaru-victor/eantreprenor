from rest_framework import serializers
from users.models import User
from .models import Course, Lesson, Group



class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField('get_id')
    roles_list = serializers.SerializerMethodField()

    class Meta:
        model = User
        extra_fields = ['id']
        exclude = ('password', )

    def get_id(self, obj):
        return obj.pk
    
    def get_roles_list(self, obj):
        return [role.name for role in obj.roles.all()]
    

class CourseSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Course
        extra_fields = ['id',]
        fields = '__all__'

    def get_id(self, obj):
        return obj.pk
    

class LessonSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        extra_fields = ['id',]
        fields = '__all__'

    def get_id(self, obj):
        return obj.pk
    

class GroupSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    users_data = UserSerializer(many=True, read_only=True, source='users')

    class Meta:
        model = Group
        extra_fields = ['id', 'users_data']
        fields = '__all__'

    def get_id(self, obj):
        return obj.pk