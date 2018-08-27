import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  books: Book[] = [];

  constructor() {
  }


  ngOnInit(): void {
  }
}
