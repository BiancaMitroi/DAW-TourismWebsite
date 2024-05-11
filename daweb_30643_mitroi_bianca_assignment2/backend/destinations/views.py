from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Destination
from .serializers import DestinationSerializer
from django.db.models import Q
from urllib.parse import unquote
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class DestinationFilter(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, location, format=None):
        print(f"Location: {location}")
        if location:
            destinations = Destination.objects.filter(Q(location__iexact=location) | 
                Q(location__icontains=location) | Q(location__istartswith=location))
        else:
            destinations = Destination.objects.all()
        if destinations:
            serializer = DestinationSerializer(destinations, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "No destinations found."}, status=status.HTTP_404_NOT_FOUND)

class DestinationList(APIView):
    # permission_classes = [IsAuthenticated]
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]  # For GET requests, require authentication
        elif self.request.method == 'POST':
            return [IsAdminUser()]       # For POST requests, require admin privileges
        else:
            return []

    def get(self, request, format=None):
        destinations = Destination.objects.all()
        serializer = DestinationSerializer(destinations, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DestinationDetail(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, id, format=None):
        try:
            return Destination.objects.get(pk=id)
        except Destination.DoesNotExist:
            return None

    def get(self, request, id, format=None):
        destination = self.get_object(id)
        if destination:
            serializer = DestinationSerializer(destination)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id, format=None):
        decoded_name = unquote(id)
        destination = Destination.objects.get(title=decoded_name)
        if destination:
            serializer = DestinationSerializer(destination, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id, format=None):
        decoded_name = unquote(id)
        destination = Destination.objects.get(title=decoded_name)
        if destination:
            destination.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)