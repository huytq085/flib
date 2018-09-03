import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book.model';
import { ActivatedRoute, Route } from '@angular/router';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-show-filter',
  templateUrl: './show-filter.component.html',
  styleUrls: ['./show-filter.component.css']
})
export class ShowFilterComponent implements OnInit {

  books: Book[] = [];

  constructor(private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params)
  });
  }


}
