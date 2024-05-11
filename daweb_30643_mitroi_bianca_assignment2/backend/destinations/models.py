from django.db import models

class Destination(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(null=True) # de modificat in frontend
    image = models.ImageField(upload_to='destinations/static/images/', max_length=100, null=True)
    location = models.CharField(max_length=100, null=True)
    pricePerNight = models.IntegerField(null=True)
    offer = models.IntegerField(default=0)
    capacity = models.IntegerField(null=True)

    def __str__(self):
        return self.title 
