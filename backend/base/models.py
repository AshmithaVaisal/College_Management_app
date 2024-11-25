from django.db import models
from django.contrib.auth.models import User

# Extend the User model to define roles (faculty or student)
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role_choices = [
        ('faculty', 'Faculty'),
        ('student', 'Student'),
    ]
    role = models.CharField(max_length=7, choices=role_choices)

    def __str__(self):
        return f'{self.user.username} - {self.role}'


class Faculty(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='faculty_profile')
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    profile_pic = models.ImageField(upload_to='faculty_pics/', null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


class Subject(models.Model):
    name = models.CharField(max_length=100)
    subject_code = models.CharField(max_length=100)
    faculties = models.OneToOneField(Faculty, related_name="subjects") 

    def __str__(self):
        return self.name


class Student(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='students')
    profile_pic = models.ImageField(upload_to='student_pics/%Y/%m/%d/', null=True, blank=True) 
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    dob = models.DateField()
    blood_group = models.CharField(max_length=10, choices=[
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-')
    ])
    contact_number = models.CharField(max_length=15)
    address = models.TextField()
    gender = models.CharField(max_length=10, choices=[
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other')
    ])
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name="students", null=True, blank=True)
    subjects = models.ManyToManyField(Subject, related_name="students")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
