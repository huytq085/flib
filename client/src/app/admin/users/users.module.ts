import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './users.component';
import { AdminUsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminUsersComponent,
    UserDetailComponent
  ]
})
export class AdminUsersModule { }
