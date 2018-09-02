import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {React} from '../models/react.model';
import {HttpParams} from '@angular/common/http';
import {PageReact} from '../models/page-react.model';

const BASE_URL = '/react';
const CREATE_URL = `${BASE_URL}/create`;
const GET_BY_PAGE_BOOK_ID = `${BASE_URL}/book`;


@Injectable({
  providedIn: 'root'
})
export class ReactService {

  constructor(private api: ApiService) {
  }

  submitReact(react: React): Observable<boolean> {
    return this.api.post(`${CREATE_URL}`, react);
  }

  getReactsByBookId(id: number): Observable<React[]> {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.api.get(`${GET_BY_PAGE_BOOK_ID}`, params);
  }
}
