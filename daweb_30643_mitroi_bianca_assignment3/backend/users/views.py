from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password

class UserList(APIView):
    # def get(self, request, format=None):
    #     destinations = Destination.objects.all()
    #     serializer = DestinationSerializer(destinations, many=True)
    #     return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        data['password'] = make_password(data['password'])
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class DestinationDetail(APIView):
#     def get_object(self, id, format=None):
#         try:
#             return Destination.objects.get(pk=id)
#         except Destination.DoesNotExist:
#             return None

#     def get(self, request, id, format=None):
#         destination = self.get_object(id)
#         if destination:
#             serializer = DestinationSerializer(destination)
#             return Response(serializer.data)
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     def put(self, request, id, format=None):
#         destination = self.get_object(id)
#         if destination:
#             serializer = DestinationSerializer(destination, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, id, format=None):
#         destination = self.get_object(id)
#         if destination:
#             destination.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(status=status.HTTP_404_NOT_FOUND)