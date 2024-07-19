from django.contrib import admin
from .models import MyModel, SubscriptionPlan, UserSubscription

class MyModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'gender', 'age', 'status')

class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'description', 'duration')

class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'plan', 'start_date', 'end_date')
    readonly_fields = ('end_date',)

admin.site.register(MyModel, MyModelAdmin)
admin.site.register(SubscriptionPlan, SubscriptionPlanAdmin)
admin.site.register(UserSubscription, UserSubscriptionAdmin)
