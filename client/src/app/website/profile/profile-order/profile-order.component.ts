import { element } from 'protractor';
import { TicketDetail } from './../../../core/models/ticket-detail.model';
import { Component, OnInit } from '@angular/core';
import { Ticket, ProfileService } from '../../../core';

@Component({
  selector: 'app-profile-order',
  templateUrl: './profile-order.component.html',
  styleUrls: ['./profile-order.component.css']
})
export class ProfileOrderComponent implements OnInit {

  tickets: Ticket[] = new Array();

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {

    // this.addData();

    this.profileService.getTickets().subscribe(
      data => {
        this.tickets = data;
      }
    )
  }


  
}
