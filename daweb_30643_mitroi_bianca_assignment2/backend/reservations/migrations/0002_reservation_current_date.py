# Generated by Django 5.0.3 on 2024-03-30 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='current_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]