# Generated by Django 5.0.3 on 2024-03-21 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('destinations', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destination',
            name='image',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
