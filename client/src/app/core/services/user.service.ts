import {ApiService} from './api.service';
import {Observable, BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../models';
import {Book} from '../models/book.model';

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
  ) {
  }

  // TODO: Goi method rerisger tu auth service
  create(user: User): Observable<User> {
    return this.apiService.post(`/register`, user);
  }

  update(user: User): Observable<User> {
    return this.apiService.put(`${BASE_URL}`, user, {responseType: 'text'});
  }

  contribute(book: Book): Observable<any> {
    return this.apiService.post(`${BASE_URL}/contribute`, book);
  }

  getAll(): Observable<User[]> {
    return this.apiService.get(`${BASE_URL}`);
  }

  delete(userId: number) {
    return this.apiService.delete(`${BASE_URL}/${userId}`, {responseType: 'text'});
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

}
