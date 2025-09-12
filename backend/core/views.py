from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django import forms
from .models import CustomUser
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.http import HttpResponse

def home(request):
    return render(request, 'core/index.html')

def dashboard(request):
    if not request.user.is_authenticated:
        return redirect('login') #ensure login
    return render(request, 'core/dashboard.html')  # Create this template later

def about(request):
    return render(request, 'core/about.html')  # Add about.html to templates/core/

def courses(request):
    return render(request, 'core/courses.html')

def patnership(request):
    return render(request, 'core/patnership.html')

def contact(request):
    return render(request, 'core/contact.html')

def verify_email(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None
    if user and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        # Specify the backend for login
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        return redirect('dashboard')
    return HttpResponse('Invalid verification link.')
    
class CustomUserCreationForm(UserCreationForm):
    full_name = forms.CharField(max_length=100, required=True)
    phone_number = forms.CharField(max_length=15, required=True)
    gender = forms.ChoiceField(choices=[
        ('male', 'Male'),
        ('female', 'Female'),
        ('prefer-not-to-say', 'Prefer not to say'),
    ], required=True)
    nationality = forms.CharField(max_length=100, required=True)
    email = forms.EmailField(required=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'full_name', 'phone_number', 'gender', 'nationality', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.username = self.cleaned_data['email']
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['full_name']
        user.phone_number = self.cleaned_data['phone_number']
        user.gender = self.cleaned_data['gender']
        user.nationality = self.cleaned_data['nationality']
        user.is_active = False  # Deactivate until verified
        if commit:
            user.save()
        return user

def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Send verification email
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            verification_url = request.build_absolute_uri(
                reverse('verify_email', kwargs={'uidb64': uid, 'token': token})
            )
            send_mail(
                subject='Verify Your Email - PrimeTech Foundation',
                message=f'Click the link to verify your email: {verification_url}',
                from_email='your_email@example.com',
                recipient_list=[user.email],
                fail_silently=False,
            )
            return render(request, 'core/login.html', {'signup_form': form, 'show_verification': True})
    else:
        form = CustomUserCreationForm()
    return render(request, 'core/login.html', {'signup_form': form})
