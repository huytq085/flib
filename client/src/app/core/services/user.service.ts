import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models';
import { Book } from '../models/book.model';

const BASE_URL = '/users';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private apiService: ApiService
    ) { }

    update(user: User): Observable<User> {
        return this.apiService.put(`${BASE_URL}`, user);
    }

    contribute(book: Book): Observable<any> {
        return this.apiService.post(`${BASE_URL}/contribute`, book);
    }
}
