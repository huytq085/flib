import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './users.component';
import { AdminUsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailNotificationComponent } from './user-detail/user-detail-notification/user-detail-notification.component';
import { UserDetailContributeComponent } from './user-detail/user-detail-contribute/user-detail-contribute.component';
import { UserDetailReactionComponent } from './user-detail/user-detail-reaction/user-detail-reaction.component';
import { UserDetailBookComponent } from './user-detail/user-detail-book/user-detail-book.component';
import { UserDetailTicketComponent } from './user-detail/user-detail-ticket/user-detail-ticket.component';
import { UserDetailTicketDetailComponent } from './user-detail/user-detail-ticket/user-detail-ticket-detail/user-detail-ticket-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminUsersComponent,
    UserDetailComponent,
    UserDetailNotificationComponent,
    UserDetailContributeComponent,
    UserDetailReactionComponent,
    UserDetailBookComponent,
    UserDetailTicketComponent,
    UserDetailTicketDetailComponent
  ]
})
export class AdminUsersModule { }
