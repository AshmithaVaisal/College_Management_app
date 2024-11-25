from rest_framework import serializers
from .models import Student
from django.contrib.auth.models import User

# Serializer for the Student model
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name','last_name','dob','blood_group','department','city',]
        

class UserSerializer(serializers.ModelSerializer):   
    class Meta:
        model = User
        fields = ['username', 'password', 'email']  
        extra_kwargs = {"password": {"write_only": True}}
        
    # Create a new user with the validated data
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(write_only=True)