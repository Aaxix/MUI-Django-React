# Generated by Django 5.0.7 on 2024-07-15 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_alter_subscriptionplan_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriptionplan',
            name='duration',
            field=models.DecimalField(decimal_places=1, max_digits=3),
        ),
    ]
