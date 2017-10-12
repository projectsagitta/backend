from django.test import TestCase

from .models import DeviceType, Device, Station
from .serializers import StationSerializer
from lib import database as db
from django.contrib.gis.geos import fromstr
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.utils.six import BytesIO
from django.utils import timezone

class ModelsTestCase(TestCase):
    def setUp(self):
        t = DeviceType.objects.create(name='Test device type')
        d = Device.objects.create(serial_no=42, device_type=t)
        Station.objects.create(device=d, station_num=1, time=timezone.now(), location=fromstr('SRID=4326;POINT(42.0 43.0)'))

    def test_station(self):
        s = Station.objects.get(station_num=1)
        self.assertEqual(s.device.serial_no, 42)
        self.assertEqual(s.device.device_type.name, 'Test device type')
        self.assertEqual(s.location.x, 42.0)

    def test_serializer(self):
        s = Station.objects.get(station_num=1)
        ser = StationSerializer(s)
        json = JSONRenderer().render(ser.data)

        stream = BytesIO(json)
        data = JSONParser().parse(stream)
        serializer = StationSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        vd = serializer.validated_data
        self.assertEqual(s.location.coords, vd['location'].coords)
        self.assertEqual(str(s.location), str(vd['location']))
        serializer.save()

    def test_merge(self):
        db.db_merge(DeviceType.objects.all(), [DeviceType(name='DT2'), DeviceType(name='Test device type')], lambda x: x.name)
        self.assertEqual(DeviceType.objects.count(), 2)
        self.assertEqual([x.name for x in DeviceType.objects.order_by('name')], ['DT2', 'Test device type'])

        t = DeviceType.objects.get(name='DT2')
        db.db_merge(Device.objects.filter(device_type=t),
                [Device(serial_no=43, device_type=t), Device(serial_no=44, device_type=t)],
                lambda x: x.serial_no)
        self.assertEqual(Device.objects.count(), 3)
        self.assertEqual([x.serial_no for x in Device.objects.order_by('serial_no')], [42, 43, 44])

        d = Device.objects.get(serial_no=44)
        time = timezone.now()
        db.db_merge(Station.objects.filter(device=d),
                [Station(device=d, station_num=2, time=time, location=fromstr('SRID=4326;POINT(42.0 43.0)'))],
                lambda x: x.station_num)
        self.assertEqual(Station.objects.count(), 2)
        station_id = Station.objects.get(device=d, station_num=2).id
        # updating location field
        db.db_merge(Station.objects.filter(device=d),
                [Station(device=d, station_num=2, time=time, location=fromstr('SRID=4326;POINT(44.0 43.0)'))],
                lambda x: x.station_num)
        self.assertEqual(Station.objects.count(), 2)
        self.assertEqual(Station.objects.get(device=d, station_num=2).id, station_id)
        self.assertEqual(Station.objects.get(device=d, station_num=2).location.x, 44.0)
        # delete station
        db.db_merge(Station.objects.filter(device=d),
                [],
                lambda x: x.station_num)
        self.assertEqual(Station.objects.count(), 1)

        db.db_merge(DeviceType.objects.all(), [DeviceType(name='Test device type')], lambda x: x.name)
        self.assertEqual(DeviceType.objects.count(), 1)
        self.assertEqual([x.name for x in DeviceType.objects.order_by('name')], ['Test device type'])
