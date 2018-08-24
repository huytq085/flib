import { ProfileService } from './../../core/services/profile.service';
import { Book } from './../../core/models/book.model';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../core';

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


  // Create data for testing purpose
  addData(){
    for (let i = 0; i < 5; i++) {
      let toDate = new Date();
      this.tickets.push(
        {
          id: i,
          dateAdded: toDate.toDateString(),
          books: [
            {
              name: `New book ${i}`,
              rating: 5,
              dateAdded: toDate.toDateString()
            },
            {
              name: `New book ${i}`,
              rating: 5,
              dateAdded: toDate.toDateString()
            },
            ,
            {
              name: `New book ${i}`,
              rating: 5,
              dateAdded: toDate.toDateString()
            },
            {
              name: `New book ${i}`,
              rating: 5,
              dateAdded: toDate.toDateString()
            }

          ] as Book[],
          status: 1
        }
      )
      
    }
  }
}
