# Generated by Django 5.0.3 on 2024-03-23 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('destinations', '0002_alter_destination_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destination',
            name='image',
            field=models.ImageField(null=True, upload_to='destinations/static/images/'),
        ),
    ]
