from rest_framework import permissions as perm
from common.models import Station

class AllowStationUploadPermissions(perm.DjangoModelPermissionsOrAnonReadOnly):
    def has_permission(self, request, view):
        return super(AllowStationUploadPermissions, self).has_permission(request, view) or (
            request.user and request.user.is_authenticated and view.queryset.model == Station and request.method == 'POST')
            # allow all authenticated users to upload stations
