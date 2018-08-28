import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { PageBook } from '../../../../../core/models/page-book.model';
import { Book } from '../../../../../core/models/book.model';
import { BookService } from '../../../../../core/services/book.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pageBook: PageBook;
  pages = [];
  @Output() choose = new EventEmitter<Book[]>();

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getBookByPage(0, 9).subscribe(data => {
      this.pageBook = data;
      for (let i = 0; i < this.pageBook.totalPages; i++) {
        this.pages.push(i);
      }
      // console.log(this.pages);
      console.log(this.pageBook.number);
      this.choose.emit(this.pageBook.content);
    });
  }

  setPage(number: number) {
    this.bookService.getBookByPage(number, 9).subscribe(data => {
      this.pageBook = data;
      this.pages.slice(this.pageBook.number - 3, this.pageBook.number + 3);
      console.log('Number of page' + this.pageBook.number);
      this.choose.emit(this.pageBook.content);
    });
  }
}
