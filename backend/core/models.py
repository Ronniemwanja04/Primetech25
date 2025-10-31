from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Ensure email uniqueness
    phone_number = models.CharField(max_length=15, blank=True)
    gender = models.CharField(max_length=20, choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('prefer-not-to-say', 'Prefer not to say'),
    ], blank=True)
    nationality = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.email
