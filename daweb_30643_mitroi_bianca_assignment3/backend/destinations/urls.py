from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static
from destinations import views

urlpatterns = [
    path('', views.DestinationList.as_view()),
    path('<str:id>/', views.DestinationDetail.as_view()),
    path('filter/<str:location>/', views.DestinationFilter.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
