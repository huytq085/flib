import { UserService } from './../services/user.service';
import { User } from './../models/user.model';
import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.params['id']
    console.log('resl user ne: ' + id)
    return this.userService.getOne(id).pipe(
        take(1),
        map (user => {
            if (user) {
                return user;
            } else {
                this.router.navigate(['/admin/users']);
                return null;
            }
        })
    )

  }
}