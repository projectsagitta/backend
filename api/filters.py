from common.models import Station
import django_filters as flt

class StationFilter(flt.FilterSet):
    mindate = flt.IsoDateTimeFilter(name='time', lookup_expr='date__gte')
    maxdate = flt.IsoDateTimeFilter(name='time', lookup_expr='date__lte')
    #month = flt.DateTimeFilter(name='time', lookup_expr='time__lte')
    #season = flt.DateTimeFilter(name='time', lookup_expr='time__lte')
    #minlat = flt.NumberFilter(name='lat', lookup_expr='lat__gte')
    #maxlat = flt.NumberFilter(name='lat', lookup_expr='lat__lte')
    #minlon = flt.NumberFilter(name='lon', lookup_expr='lon__gte')
    #maxlon = flt.NumberFilter(name='lon', lookup_expr='lon__lte')
    class Meta:
        model = Station
        fields = []
