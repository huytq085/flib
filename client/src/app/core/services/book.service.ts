import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ApiService} from './api.service';
import {Book} from '../models';
import {PageBook} from '../models/page-book.model';
import { Author } from '../models/author.model';
import { TypeOfBook } from '../models/type.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  BASE_URL = `http://localhost:8080/api/book/all`;

  constructor(private api: ApiService) {
  }

  getAllBook(): Observable<Book[]> {
    return this.api.get(`/book/all`);
  }

  getBook(id: number): Observable<Book> {
    return this.api.get(`/book/${id}`);
  }

  getBookByPage(page: number, size: number): Observable<PageBook> {
    page -= 1;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.api.get(`/book/page`, params);
  }

  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.api.get(`/book/search?name=${term}`);
  }

  searchAuthors(term: string): Observable<Author[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.api.get(`/book/author/search?name=${term}`)
  }
  getTypes(): Observable<TypeOfBook[]> {
    return this.api.get(`/book/types`);
  }

  getBookByType(idTypes: Number[]): Observable<Book[]> {
    let httpParams = new HttpParams();
    idTypes.forEach(id => {
      httpParams = httpParams.append('id', id.toString());
    });
    return this.api.get(`/book/all`, httpParams);
  }
}
