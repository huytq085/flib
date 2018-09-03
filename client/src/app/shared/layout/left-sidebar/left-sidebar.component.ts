import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FilterBookComponent } from './filter-book/filter-book.component';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
