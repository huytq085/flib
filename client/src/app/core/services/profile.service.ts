import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Profile, Ticket, Contribute } from '../models';
import { Book } from '../models/book.model';
import { HttpParams } from '@angular/common/http';

const BASE_URL = '/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private apiService: ApiService
  ) { }


  getInfo(): Observable<Profile> {
    return this.apiService.get(`${BASE_URL}/info`);
  }

  getContributes(pageConfig?: {}): Observable<any> {
    return this.apiService.get(`${BASE_URL}/contributes`, new HttpParams({ fromObject: pageConfig }));
  }

  getTickets(pageConfig?: {}): Observable<Ticket[]> {
    return this.apiService.get(`${BASE_URL}/tickets`, new HttpParams({ fromObject: pageConfig }));
  }

  getTicket(id: number): Observable<Ticket> {
    return this.apiService.get(`${BASE_URL}/tickets/${id}`)
  }

  getFavourites(): Observable<Book[]> {
    return this.apiService.get(`${BASE_URL}/favourites`)
  }

  getNotifications(): Observable<Notification[]> {
    return this.apiService.get(`${BASE_URL}/notifications`)
  }

  getBookNames(ticket: Ticket): string{
    let result = '';
    for (const ticketDetail in ticket.ticketDetailsById) {
      if (ticket.ticketDetailsById.hasOwnProperty(ticketDetail)) {
        const element = ticket.ticketDetailsById[ticketDetail];
        result+= '[' + element.bookByBookId.name.toString().substr(0,20) + '...], ';// Get 20 characters string from book name & join it
      }
    }
    return result;
  }
}
