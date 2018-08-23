import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models';

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
}
