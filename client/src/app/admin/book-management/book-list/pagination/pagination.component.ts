import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../../core/services';
import {PageBook} from '../../../../core/models/page-book.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pageBook: PageBook;

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit() {
    this.bookService.getBookByPage(1, 9).subscribe(data => {
      this.pageBook = data;
      this.pageBook.number += 1;
      console.log(this.pageBook);
      // for (let i = 0; i < this.pageBook.totalPages; i++) {
      //   this.pages.push(i);
      // }
      // // console.log(this.pages);
      // console.log(this.pageBook.number);
      // this.choose.emit(this.pageBook.content);
    });
  }

  onChange(page: number) {
    this.router.navigate(['/admin/book/page/' + (page)]);
  }

}
