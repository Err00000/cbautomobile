from django.db import models
from django.core.validators import validate_email

class Subscriber(models.Model):
    email = models.EmailField(unique=True, validators=[validate_email])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

