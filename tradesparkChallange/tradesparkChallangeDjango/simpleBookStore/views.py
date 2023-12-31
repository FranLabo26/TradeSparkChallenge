from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.shortcuts import get_list_or_404

from .models import Author, Category, Book
from .serializers import AuthorSerializer, CategorySerializer, BookSerializer

# Vista para el modelo Author
class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

# Vista para el modelo Category
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Vista para el modelo Book
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    # Acción personalizada para eliminar una categoría de un libro
    @action(detail=False, methods=['put'])
    def remove_category(self, request, bookName=None, categoryName=None):
        # Verificar si se proporcionaron nombres de libro y categoría
        if not bookName or not categoryName:
            return Response({'error': 'Book name and category name are required.'}, status=400)

        # Buscar todos los libros con el mismo título
        books = get_list_or_404(Book, title=bookName)

        # Filtrar todas las categorías con el mismo nombre
        categories = Category.objects.filter(name=categoryName)

        # Verificar si se encontraron categorías y libros
        if not categories:
            return Response({'error': 'Category not found.'}, status=404)
        if not books:
            return Response({'error': 'Book not found.'}, status=404)

        # Eliminar la categoría de todos los libros encontrados
        for book in books:
            book.categories.remove(*categories)

        return Response({'message': 'Category removed from all matching books successfully'})