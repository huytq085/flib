import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Profile, Ticket } from '../models';
import { Book } from '../../model/book.model';

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

}
