import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../book-store.service';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent implements OnInit {

  // Arreglo para almacenar todos los libros y arreglo filtrado
  books: any[] = [];
  filteredBooks: any[] = [];

  // Términos de búsqueda para cada campo
  titleTerm: string = '';
  authorTerm: string = '';
  categoryTerm: string = '';
  bookNameToRemove: string = '';
  categoryToRemove: string = '';

  // Constructor que inyecta el servicio BookStoreService
  constructor(private bookStoreService: BookStoreService) { }

  // Método llamado al inicializar el componente
  ngOnInit(): void {
    // Llama al servicio para obtener la lista de libros
    this.bookStoreService.getBooks().subscribe((data: any[]) => {
      // Almacena la lista completa de libros y establece la lista filtrada inicialmente igual a la completa
      this.books = data;
      this.filteredBooks = this.books;
    });
  }

  // Función para filtrar libros
  filterBooks() {
    // Convierte los términos de búsqueda a minúsculas para hacer la comparación insensible a mayúsculas
    const title = this.titleTerm.toLowerCase();
    const author = this.authorTerm.toLowerCase();
    const category = this.categoryTerm.toLowerCase();

    // Filtra los libros basándose en los términos de búsqueda
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(title) &&
      book.author.name.toLowerCase().includes(author) &&
      this.categoriesToString(book.categories).toLowerCase().includes(category)
    );
  }

  // Función para convertir categorías a cadena
  categoriesToString(categories: any[]): string {
    return categories.map(category => category.name).join(', ');
  }

  // Función para manejar la eliminación de categorías de libros
  removeCategoryFromAllBooks() {
    // Verifica si se proporcionaron el nombre del libro y la categoría
    if (this.bookNameToRemove && this.categoryToRemove) {
      // Llama al servicio para eliminar la categoría de los libros
      this.bookStoreService.removeCategoryFromBooks(this.bookNameToRemove, this.categoryToRemove)
        .subscribe(
          response => {
            // Loggea la respuesta del backend en la consola
            console.log(response);
            // Puedes actualizar la interfaz de usuario si es necesario
          },
          error => {
            // Loggea el error en la consola
            console.error(error);
          }
        );
    } else {
      // Muestra un mensaje en la consola indicando que se necesitan el nombre del libro y la categoría
      console.error('El nombre del libro y de la categoría son requeridos.');
    }
  }
}
