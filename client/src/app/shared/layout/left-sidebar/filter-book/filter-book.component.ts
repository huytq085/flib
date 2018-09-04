import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TypeOfBook } from '../../../../core/models/type.model';
import { BookService } from '../../../../core/services/book.service';
import { Book } from '../../../../core/models/book.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SharedService } from '../../../../core';

@Component({
  selector: 'app-filter-book',
  templateUrl: './filter-book.component.html',
  styleUrls: ['./filter-book.component.css']
})
export class FilterBookComponent implements OnInit {

  typeBooks: TypeOfBook[] = new Array();
  idChecked: Number[] = new Array();

  books: Book[];

  constructor(private bookService: BookService, private router: Router, private sharedService: SharedService) { }

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
    if (this.idChecked.length > 0) {
      this.bookService.getBookByType(this.idChecked).subscribe(data => {
        this.sharedService.updateBooks(data);
        this.books = data;
        console.log(this.books);
      });
    } else {
      this.bookService.getBookByPage(1, 9).subscribe(
        page => {
          this.sharedService.updateBooks(page.content);
        }
      );
    }
    // this.onTap();
  }

  // public onTap() {
  //   let navigationExtras: NavigationExtras = {
  //       queryParams: {
  //           "TamMap": this.idChecked
  //       }
  //   };
  //   this.router.navigate(["page/:filter"], navigationExtras);
  // }

}
