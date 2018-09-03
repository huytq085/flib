import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../core/services';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../../../core/models';
import {PageBook} from '../../../core/models/page-book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  pageBook: PageBook;
  isAdd = false;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const number = params['number'];
      this.bookService.getBookByPage(number, 12).subscribe(pageBook => {
        this.pageBook = pageBook;
      });
    });
  }

}
