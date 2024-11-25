from django.urls import path
from . import views
from .views import LoginView

urlpatterns = [
    path("students/",views.StudentListCreate.as_view(),name="student-list"),
    path("students/delete/<int:pk>",views.StudentDelete.as_view(), name="delete-note"),# Endpoint for deleting a specific student by their primary key (pk)
    path('login/', LoginView.as_view(), name='login'),
]