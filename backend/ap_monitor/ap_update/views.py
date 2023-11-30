from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.
from django.http import JsonResponse
from .models import NetworkDevice

class ListDevices(APIView):

    def get(self, request):
        devices = NetworkDevice.objects.all()
        data = [{"name": device.name, "device_type": device.device_type, "ip_address": device.ip_address} for device in devices]
        return JsonResponse(data, safe=False)
