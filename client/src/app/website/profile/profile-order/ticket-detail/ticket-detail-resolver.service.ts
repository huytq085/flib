import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
import { ProfileService, Ticket } from '../../../../core';
 

@Injectable({
  providedIn: 'root'
})
export class TicketDetailResolver implements Resolve<Ticket> {
  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.params['id']
    console.log('resl ne')
    return this.profileService.getTicket(id).pipe(
        take(1),
        map (ticket => {
            if (ticket) {
                return ticket;
            } else {
                this.router.navigate(['/profile/ticket']);
                return null;
            }
        })
    )

  }
}