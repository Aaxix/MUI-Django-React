# Generated by Django 5.0.7 on 2024-08-14 03:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_business_meetingevent_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='meetingevent',
            name='endDate',
            field=models.DateField(default=datetime.date(2024, 8, 14)),
        ),
        migrations.AddField(
            model_name='meetingevent',
            name='startDate',
            field=models.DateField(default=datetime.date(2024, 8, 14)),
        ),
    ]
