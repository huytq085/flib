import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../core';
import { TicketService } from '../../core/services/ticket.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-ticket-manager',
  templateUrl: './ticket-manager.component.html',
  styleUrls: ['./ticket-manager.component.css']
})
export class TicketManagerComponent implements OnInit {

  tickets: Ticket[] = new Array();
  currentPage: number = 0;
  size: number = 7;
  totalPages: number = 0;
  ticketsSorted: Ticket[]= new Array();

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.getAllTicketsPages();
  }

  getAllTicketsPages() {
    this.ticketService.currentTicket.subscribe(
      ticket => {
        this.ticketService.getTickesPages(this.currentPage, this.size).subscribe(data => {
          console.log(data);
          this.tickets = data["content"];
          this.totalPages = data["totalPages"];
        });   
      }
    );
  }

  setPage(i: number) {
    this.currentPage = i;
    this.getAllTicketsPages();
  }

  checkStatus(ticket: Ticket) {
    if (ticket.status !== 0) {
      this.deleteTicket(ticket);
    } else {
      alert("Ticket dont remove!!")
    }
  }

  deleteTicket(ticket: Ticket) {
    swal({
      title: 'Delete this ticket',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.ticketService.deleteTicket(ticket.id).subscribe(
          data => {
            this.tickets.splice(this.tickets.indexOf(ticket), 1);
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
