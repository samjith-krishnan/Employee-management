from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    place=models.CharField(max_length=100)
    company=models.CharField(max_length=100)
    phone=models.PositiveIntegerField()

class Form(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=200)

class Fields(models.Model):
    FIELD_TYPE_CHOICES=[
        ("text","Text"),
        ("number","Number"),
        ("email","Email"),
        ("phone","Phone"),
        ("radio","Radio"),
        ("checkbox","Checkbox"),
        ("select","Select"),


    ]
    label=models.CharField(max_length=250)
    field_type=models.CharField(max_length=50,choices=FIELD_TYPE_CHOICES)
    form=models.ForeignKey(Form,on_delete=models.CASCADE)

class FieldChoice(models.Model):
    field = models.ForeignKey(Fields, on_delete=models.CASCADE, related_name="choices")
    choice_text = models.CharField(max_length=255)

class FormResponse(models.Model):
    form = models.ForeignKey('Form', on_delete=models.CASCADE)
    field = models.ForeignKey('Fields', on_delete=models.CASCADE)
    value = models.TextField()
    unique_id=models.PositiveIntegerField(null=True)

