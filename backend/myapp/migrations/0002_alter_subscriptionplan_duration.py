# Generated by Django 5.0.7 on 2024-07-15 07:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriptionplan',
            name='duration',
            field=models.IntegerField(),
        ),
    ]
