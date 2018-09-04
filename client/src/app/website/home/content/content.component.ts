import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models';
import { ActivatedRoute } from '@angular/router';
import { BookService, SharedService } from '../../../core/services';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  books: Book[] = [];

  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService, private sharedService: SharedService) {
  }


  ngOnInit(): void {
    this.sharedService.books.subscribe(
      data => {
        this.books = data;
      }
    )
    let number = 1;
    this.activatedRoute.params.subscribe(params => {
      number = params['number'];
      this.bookService.getBookByPage(number, 9).subscribe(
        page => {
          this.sharedService.updateBooks(page.content);
        }
      );
    });
  }

  // TODO write function to retrive book list with filter conditions

}
