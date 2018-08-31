import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        loadChildren: './users/users.module#AdminUsersModule'
      },
      {
        path: 'tickets',
        loadChildren: './ticket-manager/ticket-manager.module#TicketManagerModule'
      },
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
export class AdminRoutingModule { }
