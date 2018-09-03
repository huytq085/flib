import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Route, ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../../core';
import { TicketDetail } from '../../../core/models/ticket-detail.model';
import swal from 'sweetalert2';

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
  ticket: Ticket= new Ticket();
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
    swal({
      title: 'Confirm this ticket',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.ticketService.updateTicket(this.ticket.id).subscribe(
          data => {
            this.ticket=data;
            swal({
              type: 'success',
              title: 'Successful',
            })
          }
        )
      }
    })
  }
}
