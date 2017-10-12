from django.conf.urls import include, url

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'device_types', views.DeviceTypeViewSet)
router.register(r'devices', views.DeviceViewSet)
router.register(r'stations', views.StationViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
