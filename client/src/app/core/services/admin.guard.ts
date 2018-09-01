import {TokenStorage} from '../../website/auth/authority/token.storage';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {UserService} from './user.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private tokenStorage: TokenStorage
  ) {
  }

  canActivate(): Observable<boolean> {
    if (this.tokenStorage.loggedIn()) {
      return this.userService.getRoles().pipe(
        map(
          (data) => {
            if (data) {
              console.log('co data');
              console.log(data);
              if (Array.isArray(data)) {
                for (const key in data) {
                  if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    console.log(element);
                    if (element['authority'] === 'ROLE_ADMIN') {
                      return true;
                    }
                  }
                }
              }
            }
            this.router.navigateByUrl('/login?back=/admin');
            return false;
          }
        )
      );
    } else {
      this.router.navigateByUrl('/login?back=/admin');
    }
  }
}
