# views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import MyModel, SubscriptionPlan, UserSubscription, MeetingEvent, Business, ScheduledMeeting
from .serializer import MyModelSerializer, SubscriptionPlanSerializer, UserSubscriptionSerializer, MeetingEventSerializer, BusinessSerializer, ScheduledMeetingSerializer

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

class BusinessDetailViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    lookup_field = 'businessName'

class ScheduleMeetingViewSet(viewsets.ModelViewSet):
    queryset = ScheduledMeeting.objects.all()
    serializer_class = ScheduledMeetingSerializer