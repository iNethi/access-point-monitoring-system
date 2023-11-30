from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import NetworkDevice
from .utilities import update_prometheus_targets, remove_prometheus_targets
import json

class UpdateDevices(APIView):

    def post(self, request):
        try:
            data = request.data

            new_ips = []
            for device_data in data:
                ip_address = device_data.get('ip_address')
                if not ip_address:
                    continue  # Skip if no IP address is provided

                # Update or create the NetworkDevice
                obj, created = NetworkDevice.objects.update_or_create(
                    ip_address=ip_address,
                    defaults={
                        'name': device_data.get('name', ''),
                        'device_type': device_data.get('device_type', '')
                    }
                )
                new_ips.append(ip_address)

            # Update the Prometheus targets with new IP addresses
            update_prometheus_targets(new_ips)

            return Response({"status": "success", "message": "Devices updated successfully."})

        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DeleteDevice(APIView):

    def post(self, request):
        try:
            ip_address = request.data.get('ip_address')
            if not ip_address:
                return Response({"status": "error", "message": "IP address is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the device exists
            try:
                device = NetworkDevice.objects.get(ip_address=ip_address)
            except NetworkDevice.DoesNotExist:
                return Response({"status": "error", "message": "Device not found."}, status=status.HTTP_404_NOT_FOUND)

            # Delete the device from the database
            device.delete()

            # Remove the IP address from the YAML file
            remove_prometheus_targets([ip_address])

            return Response({"status": "success", "message": "Device deleted successfully."})

        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListDevices(APIView):

    def get(self, request):
        devices = NetworkDevice.objects.all()
        data = [{"name": device.name, "device_type": device.device_type, "ip_address": device.ip_address} for device in devices]
        return JsonResponse(data, safe=False)
