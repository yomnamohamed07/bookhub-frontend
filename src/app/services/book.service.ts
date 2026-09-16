import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  Book,
  AddBookDto,
  UpdateBookDto,
  BooksResponse
} from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(
    pageIndex: number = 1,
    pageSize: number = 10
  ): Observable<BooksResponse> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);

    return this.http.get<BooksResponse>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  create(book: AddBookDto): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

 update(book: UpdateBookDto): Observable<Book> {
  return this.http.put<Book>(
    `${this.apiUrl}/${book.id}`,
    book
  );
}

  delete(id: number): Observable<string> {
  return this.http.delete(`${this.apiUrl}/${id}`, {
    responseType: 'text'
  });
}
}
