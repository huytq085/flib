import { Component, OnInit } from '@angular/core';
import { TypeOfBook } from '../../../../core/models/type.model';
import { BookService } from '../../../../core/services/book.service';
import { Book } from '../../../../core/models/book.model';

@Component({
  selector: 'app-filter-book',
  templateUrl: './filter-book.component.html',
  styleUrls: ['./filter-book.component.css']
})
export class FilterBookComponent implements OnInit {

  typeBooks: TypeOfBook[] = new Array();
  idChecked: Number[] = new Array();

  books: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getType();
  }

  getType() {
    this.bookService.getTypes().subscribe(data => {
      this.typeBooks = data;
    });
  }

  check(type: TypeOfBook, event) {
    if (event.target.checked) {
      this.idChecked.push(type.id);
    } else if (!event.target.checked) {
      this.idChecked.forEach((checkedElementId, index) => {
        if (checkedElementId === type.id) {
          this.idChecked.splice(index, 1);
        }
      })
    }
    this.bookService.getBookByType(this.idChecked).subscribe(data => {
      this.books = data;
      console.log(this.books);
    });
  }
}
