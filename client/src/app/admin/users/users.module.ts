import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './users.component';
import { AdminUsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminUsersRoutingModule
  ],
  declarations: [
    AdminUsersComponent
  ]
})
export class AdminUsersModule { }
