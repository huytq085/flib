import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Profile, Ticket } from '../models';
import { Book } from '../models/book.model';

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

  getContributes(): Observable<Book[]> {
    return this.apiService.get(`${BASE_URL}/contributes`);
  }

  getTikets(): Observable<Ticket[]> {
    return this.apiService.get(`${BASE_URL}/tickets`);
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
}
