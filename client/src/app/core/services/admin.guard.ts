import { TokenStorage } from './../../website/auth/authority/token.storage';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';

import { UserService } from './user.service';
import { take, map, first, tap, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'

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
              if (Array.isArray(data)) {
                for (const key in data) {
                  if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    if (element['authority'] == 'ROLE_ADMIN') {
                      return true;
                    }
                  }
                }
              }
            }
            Swal('Không có quyền')
            this.router.navigateByUrl('/login?back=/admin');
            return false;
          }
        ),
        catchError((error: any) => {
          Swal('Không có quyền')
          this.router.navigateByUrl('/login?back=/admin');
          return throwError(error);
        })
      )
    } else {
      Swal('Không có quyền')
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
