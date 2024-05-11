from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
# from .views import MyTokenObtainPairView
from . import views as view

urlpatterns = [
    path('register/', view.UserList.as_view(), name='register'),

]