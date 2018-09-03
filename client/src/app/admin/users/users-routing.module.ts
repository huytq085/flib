import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailTicketComponent, UserDetailBookComponent, UserDetailReactionComponent, UserDetailContributeComponent, UserDetailNotificationComponent } from './user-detail';
import { UserDetailTicketDetailComponent } from './user-detail/user-detail-ticket/user-detail-ticket-detail/user-detail-ticket-detail.component';
import { TicketDetailResolver } from '../../website/profile/profile-order/ticket-detail/ticket-detail-resolver.service';
import { UserResolver } from '../../core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent
  },
  {
    path: ':id',
    component: UserDetailComponent,
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'tickets',
        pathMatch: 'full'
      },
      {
        path: 'tickets',
        component: UserDetailTicketComponent,
      },
      {
        path: 'tickets/:id',
        component: UserDetailTicketDetailComponent,
        resolve: {
          ticket: TicketDetailResolver
        }
      },
      {
        path: 'books',
        component: UserDetailBookComponent
      },
      {
        path: 'reactions',
        component: UserDetailReactionComponent
      },
      {
        path: 'contributes',
        component: UserDetailContributeComponent
      },
      {
        path: 'notifications',
        component: UserDetailNotificationComponent
      }
    ]
  }


];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AdminUsersRoutingModule {
}
