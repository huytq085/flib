import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailTicketComponent, UserDetailBookComponent, UserDetailReactionComponent, UserDetailContributeComponent, UserDetailNotificationComponent } from './user-detail';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent
  },
  {
    path: ':id',
    component: UserDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'tickets',
        pathMatch: 'full'
      },
      {
        path: 'tickets',
        component: UserDetailTicketComponent
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
        path: 'notificatoins',
        component: UserDetailNotificationComponent
      }
    ]
  }
  

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AdminUsersRoutingModule { }
