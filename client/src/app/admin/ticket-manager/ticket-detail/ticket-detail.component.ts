import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Route, ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../../core';
import { TicketDetail } from '../../../core/models/ticket-detail.model';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private ticketService: TicketService,
  ) { }

  ticketDetail: TicketDetail[] = new Array();
  ticket: Ticket;
  ngOnInit() {
    this.getTicket();
  }

  getTicket() {
    const id = +this.route.snapshot.params.id;
    this.ticketService.getTicket(id).subscribe(data => {
      this.ticket = data;
      this.ticketDetail = this.ticket.ticketDetailsById;
    })
  }

  goBack() {
    this.location.back();
  }

  confirmStatus(){
      this.ticketService.updateTicket(this.ticket).subscribe(data =>{this.ticket=data})
  }
}
