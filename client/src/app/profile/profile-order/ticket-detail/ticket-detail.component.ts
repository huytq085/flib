import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  constructor(
    private location: Location,

  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

}
