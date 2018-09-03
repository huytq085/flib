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

  currentPage: number = 0;
  totalPages:number;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.loadTickets();    
  }

  loadTickets(){
    let pageConfig = {
      page: this.currentPage,
      size: 5 // Get 5 items
    }
    this.profileService.getTickets(pageConfig).subscribe(
      data => {
        this.tickets = data['content'];
        this.totalPages = data['totalPages'];
      }
    )
  }

  setPage(i){
    this.currentPage = i;
    this.loadTickets();
  }


  
}
