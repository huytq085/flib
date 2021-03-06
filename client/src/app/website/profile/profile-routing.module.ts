import { ProfileFavouriteComponent } from './profile-favourite/profile-favourite.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileContributeComponent } from './profile-contribute/profile-contribute.component';
import { ProfileNotificationComponent } from './profile-notification/profile-notification.component';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { TicketDetailComponent } from './profile-order/ticket-detail/ticket-detail.component';
import { TicketDetailResolver } from './profile-order/ticket-detail/ticket-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: ProfileInfoComponent
      },
      {
        path: 'notification',
        component: ProfileNotificationComponent
      },
      {
        path: 'ticket',
        component: ProfileOrderComponent
      },
      {
        path: 'ticket/:id',
        component: TicketDetailComponent,
        resolve: {
          ticket: TicketDetailResolver
        }
      },
      {
        path: 'favourite',
        component: ProfileFavouriteComponent
      },
      {
        path: 'contribute',
        component: ProfileContributeComponent
      }
    ]
  }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ProfileRoutingModule { }
