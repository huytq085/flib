import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private api: ApiService) {
    }

    public attemptAuth(email: string, password: string): Observable<any> {
        const credentials = { email, password };
        return this.api.post('/login', credentials, { responseType: 'text' });
    }

    public createUser(user: User) {
        return this.api.post('/register', user);
    }

    public getUsers(): Observable<User[]> {
        return this.api.get('/users');
    }

    public deleteUser(user: User) {
        return this.api.delete('/users' + '/' + user.id, { responseType: 'text' });
    }
}