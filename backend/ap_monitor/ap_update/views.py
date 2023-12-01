from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import NetworkDevice
from .utilities import update_prometheus_targets, remove_prometheus_targets
import json
class AddDevice(APIView):

    def post(self, request):
        data = request.data
        try:
            # Create a new device
            device = NetworkDevice.objects.create(
                name=data.get('name'),
                device_type=data.get('device_type'),
                ip_address=data.get('ip_address')
            )

            update_prometheus_targets([device.ip_address])

            return Response({"status": "success", "message": "Device added successfully."})

        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
class UpdateDevices(APIView):

    def post(self, request):
        try:
            data = json.loads(request.body)
            old_ip_address = data.get('old_ip_address')
            new_device_data = data.get('new_device_data')

            # Find the device by old IP address
            try:
                device = NetworkDevice.objects.get(ip_address=old_ip_address)
            except NetworkDevice.DoesNotExist:
                return Response({"status": "error", "message": "Device not found."}, status=status.HTTP_404_NOT_FOUND)

            # Update the device details
            device.name = new_device_data.get('name', device.name)
            device.device_type = new_device_data.get('device_type', device.device_type)
            device.ip_address = new_device_data.get('ip_address', device.ip_address)

            # Save the updated device
            device.save()

            # Optionally, update Prometheus targets if IP address has changed
            if old_ip_address != device.ip_address:
                remove_prometheus_targets([old_ip_address])
                update_prometheus_targets([device.ip_address])

            return Response({"status": "success", "message": "Device updated successfully."})

        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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


            # Remove the IP address from the YAML file
            remove_prometheus_targets([ip_address])

            # Delete the device from the database if it was removed from file
            device.delete()
            print('deleted device')


            return Response({"status": "success", "message": "Device deleted successfully."})

        except Exception as e:
            print(e)
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListDevices(APIView):

    def get(self, request):
        devices = NetworkDevice.objects.all()
        data = [{"name": device.name, "device_type": device.device_type, "ip_address": device.ip_address} for device in devices]
        return JsonResponse(data, safe=False)
