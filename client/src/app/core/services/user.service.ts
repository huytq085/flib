import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, Ticket, Contribute } from '../models';
import { Book } from '../models/book.model';
import { HttpParams } from '@angular/common/http';

const BASE_URL = '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable();

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }
    setCurrentUser(user: User) {
        this.currentUserSubject.next(user);
    }

    constructor(
        private apiService: ApiService
    ) { }
    // TODO: Goi method rerisger tu auth service
    create(user: User): Observable<User> {
        return this.apiService.post(`/register`, user);
    }

    update(user: User): Observable<User> {
        return this.apiService.put(`${BASE_URL}`, user, { responseType: 'text' });
    }

    contribute(book: Book): Observable<any> {
        return this.apiService.post(`${BASE_URL}/contribute`, book);
    }

    getAll(pageConfig?: {}): Observable<User[]> {
        return this.apiService.get(`${BASE_URL}`, new HttpParams({ fromObject: pageConfig }));
    }

    // getUsersPages(page: number, size: number): Observable<any> {
    //     return this.apiService.get(`${BASE_URL}/pages?page=${page}&size=${size}`);
    // }

    delete(userId: number) {
        return this.apiService.delete(`${BASE_URL}/${userId}`, { responseType: 'text' })
    }

    getRoles() {
        return this.apiService.get(`${BASE_URL}/roles`);
    }

    search(value: string): Observable<User[]> {
        return this.apiService.get(`${BASE_URL}?q=${value}`);
    }

    favourite(bookId: number): Observable<boolean> {
        return this.apiService.get(`${BASE_URL}/favourite/${bookId}`);
    }
    getTicketsByUserId(userId: number, pageConfig?: {}): Observable<any> {
        return this.apiService.get(`${BASE_URL}/${userId}/tickets`, new HttpParams({ fromObject: pageConfig }));
    }
    actionTicket(ticketId: number, status?: number): Observable<boolean> {
        return this.apiService.get(`${BASE_URL}/tickets/${ticketId}?status=${status}`);
    }
    getOne(userId: number): Observable<User> {
        return this.apiService.get(`${BASE_URL}/${userId}`);
    }
    getBooksByUserId(userId: number, pageConfig?: {}): Observable<any> {
        return this.apiService.get(`${BASE_URL}/${userId}/books`, new HttpParams({ fromObject: pageConfig }));
    }
    takeBook(userId: number, bookId: number): Observable<boolean> {
        return this.apiService.delete(`${BASE_URL}/${userId}/books/${bookId}`);
    }
    getContributesByUserId(userId: number, pageConfig?: {}): Observable<Contribute[]> {
        return this.apiService.get(`${BASE_URL}/${userId}/contributes`, new HttpParams({ fromObject: pageConfig }));
    }
    approveContribute(userId: number, bookId: number, status: number): Observable<boolean> {
        return this.apiService.get(`${BASE_URL}/${userId}/contributes/${bookId}?status=${status}`);
    }

}
