import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  // URL base para las operaciones en el servidor backend
  private apiUrl = 'http://localhost:8000/bookStore/books/';

  constructor(private client: HttpClient) { }

  // Método para obtener todos los libros desde el servidor
  getBooks(): Observable<any> {
    return this.client.get(this.apiUrl);
  }

  // Método para obtener libros por nombre desde el servidor
  getBooksByName(bookName: string): Observable<any> {
    // Construye la URL con el parámetro de búsqueda por título
    const url = `${this.apiUrl}?title=${bookName}`;
    return this.client.get(url);
  }

  // Método para eliminar una categoría de un libro mediante una solicitud PUT al servidor
  removeCategoryFromBooks(bookName: string, categoryName: string): Observable<any> {
    // Construye la URL para la operación de eliminación de categoría
    const url = `${this.apiUrl}remove-category/${bookName}/${categoryName}/`;
    // Realiza una solicitud PUT al servidor con un objeto vacío en el cuerpo
    return this.client.put(url, {});
  }
}
