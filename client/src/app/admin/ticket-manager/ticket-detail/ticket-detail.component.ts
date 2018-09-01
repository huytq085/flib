import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  constructor(
    private location: Location,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
  }

  getBooks() {
    const idTicket = +this.route.snapshot.paramMap.get('id');
    
  }


  goBack() {
    this.location.back();
  }
}
