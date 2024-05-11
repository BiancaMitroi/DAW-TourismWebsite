from django.contrib.auth.models import User as BaseUser
from django.contrib.auth.hashers import make_password
from django.db import models

class User(BaseUser):  
    is_staff = BaseUser.is_staff
    is_superuser = BaseUser.is_superuser

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self._password = raw_password  