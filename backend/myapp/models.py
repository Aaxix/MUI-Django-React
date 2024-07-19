from django.db import models
from datetime import timedelta, date

class MyModel(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField(help_text="Example: abc@xyz.com")
    gender = models.CharField(max_length=100)
    age = models.IntegerField()
    status = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class SubscriptionPlan(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    duration = models.IntegerField(help_text="Duration of the plan in days")

    def __str__(self):
        return self.name

class UserSubscription(models.Model):
    user = models.ForeignKey(MyModel, on_delete=models.CASCADE)
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.start_date:
            self.start_date = date.today()
        if self.plan and self.plan.duration:
            self.end_date = self.start_date + timedelta(days=self.plan.duration)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.name} - {self.plan.name}"
