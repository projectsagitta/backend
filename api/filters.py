from common.models import Station
import django_filters as flt

MONTHS = ['january', 'february', 'march',
    'april', 'may', 'june',
    'july', 'august', 'september',
    'october', 'november', 'december']

SEASONS = {
    'winter': [12,  1,  2],
    'spring': [ 3,  4,  5],
    'summer': [ 6,  7,  8],
    'autumn': [ 9, 10, 11],
}

def month_number(v):
    try:
        return MONTHS.index(v) + 1
    except ValueError:
        return 0     # unknown month name

def season_month_numbers(v):
    if v in SEASONS:
        return SEASONS[v]
    else:
        return []     # unknown season name

class StationFilter(flt.FilterSet):
    mindate = flt.IsoDateTimeFilter(name='time', lookup_expr='date__gte')
    maxdate = flt.IsoDateTimeFilter(name='time', lookup_expr='date__lte')

    month = flt.TypedChoiceFilter(name='time', lookup_expr='month', choices=[(x,x) for x in MONTHS], coerce=month_number)
    season = flt.TypedChoiceFilter(name='time', lookup_expr='month__in', choices=[(x,x) for x in SEASONS.keys()], coerce=season_month_numbers)

    minlat = flt.NumberFilter(name='location', lookup_expr='lat__gte')
    maxlat = flt.NumberFilter(name='location', lookup_expr='lat__lte')
    minlon = flt.NumberFilter(name='location', lookup_expr='lon__gte')
    maxlon = flt.NumberFilter(name='location', lookup_expr='lon__lte')

    class Meta:
        model = Station
        fields = []
