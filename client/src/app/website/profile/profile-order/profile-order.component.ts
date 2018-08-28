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

    this.profileService.getTikets().subscribe(
      data => {
        this.tickets = data;
      }
    )
  }


  getBookNames(ticket: Ticket): string{
    let result = '';
    for (const ticketDetail in ticket.ticketDetailsById) {
      if (ticket.ticketDetailsById.hasOwnProperty(ticketDetail)) {
        const element = ticket.ticketDetailsById[ticketDetail];
        result+= '[' + element.bookByBookId.name.substr(0,20) + '...], ';// Get 20 characters string from book name & join it
      }
    }
    return result;
  }
  
}
