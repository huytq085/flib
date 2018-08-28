import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Ticket, User} from '../models';
import {Observable} from 'rxjs';
import {Book} from '../models/book.model';
import {Cart} from '../models/cart.model';

const BASE_URL = '/ticket';
const CREATE_TICKET = BASE_URL + '/create';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private apiService: ApiService
  ) {
  }

  // TODO: Goi method rerisger tu auth service
  createTicket(cart: Cart): Observable<any> {
    console.log(cart);
    return this.apiService.post(`/ticket/create`, cart);
  }

  // update(user: User): Observable<User> {
  //   return this.apiService.put(`${BASE_URL}`, user, {responseType: 'text'});
  // }
  //
  // contribute(book: Book): Observable<any> {
  //   return this.apiService.post(`${BASE_URL}/contribute`, book);
  // }
  //
  // getAll(): Observable<User[]> {
  //   return this.apiService.get(`${BASE_URL}`);
  // }
  //
  // delete(userId: number) {
  //   return this.apiService.delete(`${BASE_URL}/${userId}`, {responseType: 'text'});
  // }
}
