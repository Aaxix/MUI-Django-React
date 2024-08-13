from rest_framework import serializers
from .models import MyModel, SubscriptionPlan, UserSubscription, MeetingEvent, Business, ScheduledMeeting
from datetime import date, timedelta

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = '__all__'

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'

class UserSubscriptionSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    plan_name = serializers.CharField(source='plan.name', read_only=True)
    end_date = serializers.DateField(read_only=True)

    class Meta:
        model = UserSubscription
        fields = ['id', 'user', 'user_name', 'plan', 'plan_name', 'start_date', 'end_date']

    def create(self, validated_data):
        plan = validated_data['plan']
        start_date = validated_data.get('start_date', date.today())
        validated_data['end_date'] = start_date + timedelta(days=plan.duration)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        plan = validated_data.get('plan', instance.plan)
        start_date = validated_data.get('start_date', instance.start_date)
        if 'start_date' in validated_data:
            validated_data['end_date'] = start_date + timedelta(days=plan.duration)
        return super().update(instance, validated_data)
    
class MeetingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingEvent
        fields = '__all__'

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'

class ScheduledMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledMeeting
        fields = '__all__'