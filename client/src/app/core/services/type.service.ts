import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {TypeOfBook} from '../models/type.model';
import {Injectable} from '@angular/core';

const BASE_URL = '/type';
@Injectable({
  providedIn: 'root'
})
export class TypeService {
  constructor(private api: ApiService) {
  }

  getAll(): Observable<TypeOfBook[]> {
    return this.api.get(`${BASE_URL}/all`);
  }

}
