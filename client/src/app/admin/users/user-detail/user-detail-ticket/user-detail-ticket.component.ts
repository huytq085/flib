import { UserService } from './../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Ticket, ProfileService } from '../../../../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail-ticket',
  templateUrl: './user-detail-ticket.component.html',
  styleUrls: ['./user-detail-ticket.component.css']
})
export class UserDetailTicketComponent implements OnInit {

  tickets: Ticket[] = new Array();
  totalPages: number;
  currentPage: number = 0;
  userId;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.parent)
    this.route.parent.params.subscribe(params => {
      this.userId = +params["id"];
      this.loadTickets();    
    });

  }
  loadTickets(){
    let pageConfig = {
      page: this.currentPage,
      size: 5 //get 5 items
    }
    this.userService.getTicketsByUserId(this.userId, pageConfig).subscribe(
      data => {
        this.tickets = data['content'];
        this.totalPages = data['totalPages'];
      }
    )
  }
  setPage(i){
    console.log(i)
    this.currentPage = i;
    this.loadTickets();
  }

}
