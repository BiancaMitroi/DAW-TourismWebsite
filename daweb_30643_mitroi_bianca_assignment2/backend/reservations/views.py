from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import date as d

from .models import Reservation
from .serializers import ReservationSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class ReservationList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        data['current_date'] = d.today()
        serializer = ReservationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ReservationsBy(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, id, format=None):
        reservations = Reservation.objects.filter(destination=id)
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)