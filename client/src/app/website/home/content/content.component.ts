import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../../core/models/book.model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  books: Book[] = [];

  constructor(private activedRoute: ActivatedRoute, private bookService: BookService) {
  }


  ngOnInit(): void {
    const number = +this.activedRoute.snapshot.paramMap.get('number');
    this.bookService.getBookByPage(number, 9).subscribe(data => this.books = data.content);
  }
}
