import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Book } from '../models/book.model';
import { PageBook } from '../models/page-book.model';

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

  getBookByPage(page: number, size: number): Observable<PageBook> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.api.get(`/book/page`,params);
  }
}
