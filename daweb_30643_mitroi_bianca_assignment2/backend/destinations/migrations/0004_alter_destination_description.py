# Generated by Django 5.0.3 on 2024-03-23 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('destinations', '0003_alter_destination_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destination',
            name='description',
            field=models.CharField(null=True),
        ),
    ]
