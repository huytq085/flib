import {Component, OnInit} from '@angular/core';
import {Book} from '../../../core/models';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../../core/services';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  books: Book[] = [];

  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) {
  }


  ngOnInit(): void {
    let number = 1;
    this.activatedRoute.params.subscribe(params => {
      number = params['number'];
      this.bookService.getBookByPage(number, 9).subscribe(page => this.books = page.content);
    });
  }

  // TODO write function to retrive book list with filter conditions

}
