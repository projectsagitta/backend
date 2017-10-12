from django.contrib import admin

from .models import *

admin.site.register(DeviceType)
admin.site.register(Device)
admin.site.register(Station)
admin.site.register(Parameter)
admin.site.register(Measure)
