import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileNotificationComponent } from './profile-notification/profile-notification.component';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { ProfileFavouriteComponent } from './profile-favourite/profile-favourite.component';
import { ProfileContributeComponent } from './profile-contribute/profile-contribute.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketDetailComponent } from './profile-order/ticket-detail/ticket-detail.component';
import { TicketDetailResolver } from './profile-order/ticket-detail/ticket-detail-resolver.service'
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfileNotificationComponent,
    ProfileOrderComponent,
    ProfileFavouriteComponent,
    ProfileContributeComponent,
    TicketDetailComponent
  ],
  providers: [
    TicketDetailResolver
  ]
})
export class ProfileModule { }
