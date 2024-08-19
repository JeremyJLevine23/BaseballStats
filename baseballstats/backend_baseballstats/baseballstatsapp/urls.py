from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayerView

# Inside Django/Python DefaultRouter automatically generates RESTful routes
router = DefaultRouter()
router.register(r'players', PlayerView)

# This is where we specify what kind of paths can be written to the API
urlpatterns = [
    path('', include(router.urls))
]
