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
    return this.http.get<any>(`${API_URL}${path}`, { params })
      .pipe(catchError(this.handleError));
  }

  post(path: string, body: any, options?: {}): Observable<any> {
    return this.http.post<any>(`${API_URL}${path}`, body, options)
      .pipe(catchError(this.handleError));
  }
  put(path: string, body: any, options?: {}): Observable<any> {
    return this.http.put<any>(`${API_URL}${path}`, body, options)
      .pipe(catchError(this.handleError));
  }
  delete(path: string): Observable<any> {
    return this.http.delete(`${API_URL}${path}`)
      .pipe(catchError(this.handleError));
  }
}
