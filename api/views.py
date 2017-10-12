from django.shortcuts import render

from common.models import Station, Device, DeviceType
from .serializers import StationSerializer, DeviceSerializer, DeviceTypeSerializer
from rest_framework import viewsets

class DeviceTypeViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing device types.
    """
    queryset = DeviceType.objects.all()
    serializer_class = DeviceTypeSerializer

class DeviceViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing devices.
    """
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

class StationViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing stations.
    """
    queryset = Station.objects.all()
    serializer_class = StationSerializer
