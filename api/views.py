from django.shortcuts import render

from common.models import Station, Device, DeviceType
from .serializers import StationSerializer, StationVerboseSerializer, DeviceSerializer, DeviceTypeSerializer
from .filters import StationFilter
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

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
    #serializer_class = StationSerializer
    def get_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = StationSerializer
        if not kwargs.get('many', False):
            # include values if only one station is requested
            serializer_class = StationVerboseSerializer
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    filter_backends = (DjangoFilterBackend,)
    filter_class = StationFilter
