import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PageBook} from '../../../../../core/models/page-book.model';
import {Book} from '../../../../../core/models/book.model';
import {BookService} from '../../../../../core/services/book.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pageBook: PageBook;
  emitPageBook: Observable<PageBook>;
  pages = [];
  @Output() choose = new EventEmitter<Book[]>();

  constructor(private bookService: BookService, private router: Router) {

  }

  ngOnInit() {
    this.bookService.getBookByPage(0, 9).subscribe(data => {
      this.pageBook = data;
      this.pageBook.number += 1;
      console.log(this.pageBook.totalElements);
      // for (let i = 0; i < this.pageBook.totalPages; i++) {
      //   this.pages.push(i);
      // }
      // // console.log(this.pages);
      // console.log(this.pageBook.number);
      // this.choose.emit(this.pageBook.content);
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

  onChange(page: number) {
    this.router.navigate(['/book/page/' + (page)]);
  }
}
