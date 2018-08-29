import { UserService } from './../../../../../core/services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../../../core/models/book.model';
import { BookService } from '../../../../../core/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book = {} as Book;

  constructor(private bookService: BookService, private route: ActivatedRoute, private userService: UserService) {
    this.getBook();
  }

  ngOnInit() {
  }

  getBook(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
    });
  }

  toggleFavorite(){
    // this.userService
  }

}
