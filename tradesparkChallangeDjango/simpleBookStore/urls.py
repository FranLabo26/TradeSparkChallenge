from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthorViewSet, CategoryViewSet, BookViewSet

# Crear un enrutador predeterminado para las vistas basadas en conjunto
router = DefaultRouter()
router.register(r'authors', AuthorViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'books', BookViewSet)

# Definir las rutas de la aplicación
urlpatterns = [
    # Incluir las rutas generadas por el enrutador
    path('', include(router.urls)),
    
    # Ruta personalizada para la acción remove_category en la vista BookViewSet
    path('books/remove-category/<str:bookName>/<str:categoryName>/', BookViewSet.as_view({'put': 'remove_category'}), name='remove_category'),
]