from django.conf.urls import include, url

from . import views
from rest_framework import routers

from django.views.generic.base import RedirectView
from django.core.urlresolvers import reverse

class MyRedirectView(RedirectView):
    def get_redirect_url(self):
        return reverse('station-list') + '?' + self.request.GET.urlencode()

router = routers.DefaultRouter()
router.register(r'device_types', views.DeviceTypeViewSet)
router.register(r'devices', views.DeviceViewSet)
router.register(r'stations', views.StationViewSet)


urlpatterns = [
    url(r'^stations\/query', MyRedirectView.as_view(permanent=False)),
    url(r'^', include(router.urls)),
]
