from rest_framework import serializers
from users.models import User
from .models import Course, Lesson, Group, SharedFile



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


class SharedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedFile
        fields = '__all__'
    

class GroupSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    users_data = UserSerializer(many=True, read_only=True, source='users')
    files_data = SharedFileSerializer(many=True, read_only=True, source='shared_files')

    class Meta:
        model = Group
        extra_fields = ['id', 'users_data', 'files_data']
        fields = '__all__'

    def get_id(self, obj):
        return obj.pk


class BulkUploadSerializer(serializers.Serializer):
    files = serializers.ListField(
        child=serializers.FileField(),
        write_only=True
    )
    group_id = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        group_id = validated_data['group_id']
        files = validated_data['files']
        group = Group.objects.get(id=group_id)
        shared_files = [SharedFile(file=file, group=group) for file in files]
        return SharedFile.objects.bulk_create(shared_files)