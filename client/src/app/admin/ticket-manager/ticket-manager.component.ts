import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../core';
import { TicketService } from '../../core/services/ticket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket-manager',
  templateUrl: './ticket-manager.component.html',
  styleUrls: ['./ticket-manager.component.css']
})
export class TicketManagerComponent implements OnInit {
  tickets:Ticket[]= new Array();

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.getAllTickets();
  }
  getAllTickets(){
    this.ticketService.getTickets().subscribe(data =>{
      this.tickets=data;
      console.log(data);
    });
  }
}
