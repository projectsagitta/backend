from django.contrib.gis.db import models
from lib import database as db

class DeviceType(models.Model):
    ''' Type of measuring device '''
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Device(models.Model):
    ''' Measuring device '''
    serial_no = models.IntegerField()
    device_type = models.ForeignKey(DeviceType)
    def __str__(self):
        return '{} {}'.format(str(self.device_type), self.serial_no)

class Station(models.Model):
    ''' Station: session of measurement '''
    device = models.ForeignKey(Device)
    station_num = models.IntegerField(null=True)
    time = models.DateTimeField()
    location = models.PointField()
    def empty_values(self):
        '''
        Empty array for StationSerializer
        '''
        return []

    def measured_values(self):
        names = dict([(p.id, p.name) for p in Parameter.objects.all()])
        result = []
        i = None
        for measure in self.measure_set.order_by('index'):
            if i != measure.index:
                i = measure.index
                result.append({'index': i})
            parameter_name = names[measure.parameter_id]
            result[-1][parameter_name] = measure.value
        return result
    def save_measured_values(self, vals):
        params = dict([(p.name, p.id) for p in Parameter.objects.all()])
        measures = []
        for val in vals:
            i = val['index']
            for k,v in val.items():
                if k == 'index':
                    continue
                if k not in params:
                    p = Parameter.objects.create(name=k, display_name=k)
                    params[k] = p.id
                measures.append(Measure(station=self, index=i, parameter_id=params[k], value=v))
        db.db_merge(Measure.objects.filter(station=self), measures, lambda x: (x.index, x.parameter_id))

    def __str__(self):
        return 'Station {} at {}'.format(self.time, self.location.coords)

class Parameter(models.Model):
    ''' Physical value: pressure, temperature, salinity, maybe more '''
    name = models.CharField(max_length=50)
    display_name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Measure(models.Model):
    ''' Single measurement of physical value '''
    station = models.ForeignKey(Station)
    index = models.IntegerField()
    parameter = models.ForeignKey(Parameter)
    value = models.FloatField()
    def __str__(self):
        return '{}: {} = {}'.format(self.index, self.parameter.name, self.value)
