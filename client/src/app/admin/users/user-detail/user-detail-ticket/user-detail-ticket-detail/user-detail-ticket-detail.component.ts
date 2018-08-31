import { Ticket } from './../../../../../core/models/ticket.model';
import { UserService } from './../../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { TicketDetail } from '../../../../../core/models/ticket-detail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail-ticket-detail',
  templateUrl: './user-detail-ticket-detail.component.html',
  styleUrls: ['./user-detail-ticket-detail.component.css']
})
export class UserDetailTicketDetailComponent implements OnInit {

  ticketDetails: TicketDetail[] = new Array();
  ticket: Ticket = {} as Ticket
  constructor(
    private route: ActivatedRoute,
    private userSerivice: UserService,
    private location: Location,

  ) { }

  ngOnInit() {
    console.log('detai ne')
    this.route.data
      .subscribe(data => {
        console.log(data);
        this.ticket = data.ticket;
        this.ticketDetails = data.ticket.ticketDetailsById;
      });
  }

  action(status: number) {
    swal({
      title: (status == 0) ? 'Approve' : 'Reject' + ' this ticket?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.userSerivice.actionTicket(this.ticket.id, status).subscribe(
          (data) => {
            if (data) {
              if (status == 1) {
                this.ticket.status = status;
                swal({
                  type: 'success',
                  title: 'Successful',
                })
              } else {
                this.ticket.status = status;
                swal({
                  type: 'success',
                  title: 'Successful',
                }).then(()=>{
                  this.location.back();
                })
                
              }

            }
          }
        )

      }
    })
  }
}
