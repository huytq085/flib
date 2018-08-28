import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    constructor(private http: HttpClient) {
    }

    public attemptAuth(email: string, password: string): Observable<any> {
        const credentials = { email, password };
        return this.http.post('http://localhost:8080/api/login', credentials, { responseType: 'text' });
    }

    public getUsers() {
        return this.http.get<User[]>('http://localhost:8080/api/users');
    }

    public deleteUser(user: User) {
        return this.http.delete('http://localhost:8080/api/users' + '/' + user.id, {responseType: 'text'});
    }

    public createUser(user: User) {
        return this.http.post('http://localhost:8080/api/register', user);
    }   
}