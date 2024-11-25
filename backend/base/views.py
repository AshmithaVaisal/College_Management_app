from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,StudentSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            try:
                user_profile = UserProfile.objects.get(user=user)
            except UserProfile.DoesNotExist:
                # Create a default profile if not found
                UserProfile.objects.create(user=user, role='student')  # Or 'faculty'
                user_profile = UserProfile.objects.get(user=user)

            role = user_profile.role
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            if role == 'faculty':
                return Response({
                    "message": "Login successful",
                    "access_token": str(access_token),
                    "refresh_token": str(refresh),
                    "role": role,
                    "redirect_url": "/faculty-dashboard"
                }, status=status.HTTP_200_OK)
            elif role == 'student':
                return Response({
                    "message": "Login successful",
                    "access_token": str(access_token),
                    "refresh_token": str(refresh),
                    "role": role,
                    "redirect_url": "/student-dashboard"
                }, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid role."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)




class StudentListCreate (generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Student.objects.filter(owner = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class StudentDelete(generics.DestroyAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Student.objects.filter(owner=self.request.user)
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes  = [AllowAny]

