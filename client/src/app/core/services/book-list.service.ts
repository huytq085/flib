import {EventEmitter, Injectable} from '@angular/core';
import {Book} from '../models';
import {BookService} from './book.service';
import {PageBook} from '../models/page-book.model';

@Injectable({
  providedIn: 'root'
})
export class BookListService {
  pagesBook: PageBook;

  books = new EventEmitter<Book[]>();

  constructor(private bookService: BookService) {
  }

  update;
}
