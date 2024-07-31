# views.py
from rest_framework import viewsets
from .models import MyModel, SubscriptionPlan, UserSubscription, MeetingEvent
from .serializer import MyModelSerializer, SubscriptionPlanSerializer, UserSubscriptionSerializer, MeetingEventSerializer

class MyModelViewSet(viewsets.ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

class SubscriptionPlanViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer

class UserSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer

class MeetingEventViewSet(viewsets.ModelViewSet):
    queryset = MeetingEvent.objects.all()
    serializer_class = MeetingEventSerializer