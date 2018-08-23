import { Component, OnInit } from '@angular/core';
import { PageBook } from '../../../core/models/page-book.model';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pageBook: PageBook;
  pages=[];
  constructor(private bookService:BookService) { }

  ngOnInit() {
    this.bookService.getBookByPage(0,12).subscribe(data => {
      this.pageBook=data;
      for (let i = 0; i < this.pageBook.totalPages; i++) {
       this.pages.push(i);
      }
      // console.log(this.pages);
      console.log(this.pageBook.number);

    });
  }
  setPage(number:number){
    this.bookService.getBookByPage(number,12).subscribe(data => {
      this.pageBook = data;
      this.pages.slice(this.pageBook.number-3,this.pageBook.number+3);
      console.log(this.pageBook.number);
    })
  }
}
