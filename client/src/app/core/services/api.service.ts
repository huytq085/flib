import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(
    private http: HttpClient
  ) { }

  private handleError(error: any) {
    return throwError(error);
  }

  get(path: string, params?: HttpParams): Observable<any> {
    return this.http.get(`${API_URL}${path}`, { params })
      .pipe(catchError(this.handleError));
  }

  post(path: string, body: {}, options: {}): Observable<any> {
    return this.http.post(`${API_URL}${path}`, JSON.stringify(body), options)
      .pipe(catchError(this.handleError));
  }
  put(path: string, body: {}, options: {}): Observable<any> {
    return this.http.put(`${API_URL}${path}`, JSON.stringify(body), options)
      .pipe(catchError(this.handleError));
  }
  delete(path: string): Observable<any> {
    return this.http.delete(`${API_URL}${path}`)
      .pipe(catchError(this.handleError));
  }
}
