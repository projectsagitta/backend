from rest_framework import serializers
from common.models import Station, Parameter, Device, DeviceType
from django.contrib.gis.geos import Point
from django.db import transaction

class CoordField(serializers.Field):
    """
    Coordinates are serialized into {lat: x, lon: y}
    """
    default_error_messages = {
        'required': 'Expected lat and lon fields, got {keys}.',
        'invalid': 'Error in lat/lon: {msg}.',
    }

    def to_representation(self, obj):
        return {'lon': obj[0], 'lat': obj[1]}

    def to_internal_value(self, data):
        try:
            lat = data['lat']
            lon = data['lon']
        except KeyError:
            self.fail('required', keys=', '.join(data.keys()))
        try:
            return Point(x=lon, y=lat, srid=4326)
        except TypeError as e:
            self.fail('invalid', msg=str(e))

class DeviceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceType
        fields = ('id', 'name')

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('id', 'serial_no', 'device_type')

class StationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    id_device = serializers.IntegerField(source='device.serial_no')
    id_station = serializers.IntegerField(source='station_num', required=False) #, allow_blank=True, max_length=100)
    time = serializers.DateTimeField()
    coord = CoordField(source='location')
    results = serializers.JSONField(source='empty_values')

class StationVerboseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    id_device = serializers.IntegerField(source='device.serial_no')
    id_station = serializers.IntegerField(source='station_num', required=False) #, allow_blank=True, max_length=100)
    time = serializers.DateTimeField()
    coord = CoordField(source='location')
    results = serializers.JSONField(source='measured_values')

    def create(self, validated_data):
        """
        Create and return a new `Station` instance, given the validated data.
        """
        dev = validated_data.get('device')
        validated_data['device'] = Device.objects.get(serial_no=dev['serial_no'])
        vals = validated_data.get('measured_values', None)
        if 'measured_values' in validated_data:
            del validated_data['measured_values']
        with transaction.atomic():
            s = Station.objects.create(**validated_data)
            if vals is not None:
                s.save_measured_values(vals)
        return s

    def update(self, instance, validated_data):
        """
        Update and return an existing `Station` instance, given the validated data.
        """
        dev = validated_data.get('device')
        d = Device.objects.get(serial_no=dev['serial_no'])
        instance.device_id = d.id
        instance.station_num = validated_data.get('station_num', instance.station_num)
        instance.time = validated_data.get('time', instance.time)
        instance.location = validated_data.get('location', instance.location)
        with transaction.atomic():
            instance.save()
            vals = validated_data.get('measured_values', None)
            if vals is not None:
                instance.save_measured_values(vals)
        return instance
