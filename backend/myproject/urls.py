"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from myapp import views
from rest_framework import routers

router=routers.DefaultRouter()
router.register(r'employee',views.MyModelViewSet,'employee')
router.register(r'subscriptions', views.SubscriptionPlanViewSet, 'subscriptions')
router.register(r'user-subscriptions', views.UserSubscriptionViewSet, 'user-subscriptions')
router.register(r'meeting-events', views.MeetingEventViewSet, 'meeting-events')
router.register(r'businessName', views.BusinessDetailViewSet, 'business-detail')
router.register(r'schedule-meeting', views.ScheduleMeetingViewSet, 'schedule-meeting')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(router.urls)),
]
