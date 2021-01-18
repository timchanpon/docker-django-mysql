from django.urls import path

from . import views

app_name = 'users'
urlpatterns = [
    path('login', views.login),
    path('logout', views.logout),
    path('data', views.user_data),
]
