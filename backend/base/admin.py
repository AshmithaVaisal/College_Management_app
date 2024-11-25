from django.contrib import admin
from .models import *
from .models import UserProfile

# registering models 
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role') 
    list_filter = ('role',)  
    search_fields = ('username', 'email')  
    fieldsets = (
        (None, {
            'fields': ('username', 'email', 'password', 'role')
        }),
    )

admin.site.register(Student)
admin.site.register(Faculty)
admin.site.register(Subject)
admin.site.register(UserProfile)


