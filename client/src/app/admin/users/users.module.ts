import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './users.component';
import { AdminUsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminUsersComponent
  ]
})
export class AdminUsersModule { }
