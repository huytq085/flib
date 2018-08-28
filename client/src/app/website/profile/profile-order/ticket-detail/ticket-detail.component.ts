import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TicketDetail } from '../../../../core/models/ticket-detail.model';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticketDetails: TicketDetail[] = new Array();
  ticketId;
  constructor(
    private location: Location,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        console.log(data);
        this.ticketId = data.ticket.id;
        this.ticketDetails = data.ticket.ticketDetailsById;
      });
  }

  goBack() {
    this.location.back();
  }

}
