import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Ticket, User } from '../models';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Cart } from '../models/cart.model';
import { TicketDetail } from '../models/ticket-detail.model';
import { HttpClient } from 'selenium-webdriver/http';

const BASE_URL = '/ticket';
const CREATE_TICKET = BASE_URL + '/create';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private apiService: ApiService,
  ) {
  }

  // TODO: Goi method rerisger tu auth service
  createTicket(cart: Cart): Observable<any> {
    console.log(cart);
    return this.apiService.post(`/ticket/create`, cart);
  }

  getTickets(): Observable<Ticket[]> {
    return this.apiService.get(`/ticket`);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.apiService.get(`/ticket/${id}`);
  }

  updateTicket(id: number): Observable<Ticket> {
    return this.apiService.put(`/ticket`, id);
  }

  deleteTicket(id: number):Observable<Ticket>{
    return this.apiService.delete(`/ticket`, id);
  }
}
