import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage;
  @Input() totalPages;
  
  @Output() setPageEmit = new EventEmitter<number>();

  pages: number[] = new Array();

  constructor() { }

  ngOnInit() {
    this.pages = new Array(this.totalPages);
  }

  setPage(i){
    this.currentPage = i;
    this.setPageEmit.emit(i);
  }

}
