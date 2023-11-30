from django.contrib import admin

from .models import NetworkDevice

@admin.register(NetworkDevice)
class NetworkDeviceAdmin(admin.ModelAdmin):
    list_display = ('name', 'device_type', 'ip_address')