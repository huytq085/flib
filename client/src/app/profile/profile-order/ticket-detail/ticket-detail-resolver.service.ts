import { ProfileService } from './../../../core/services/profile.service';
import { Ticket } from './../../../core/models/ticket.model';
import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
 

@Injectable()
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