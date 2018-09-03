import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {BookManagementComponent} from './book-management/book-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#AdminUsersModule'
      },
      {
        path: 'tickets',
        loadChildren: './ticket-manager/ticket-manager.module#TicketManagerModule'
      },
      {
        path: 'book',
        loadChildren: './book-management/book-management.module#BookManagementModule'
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class AdminRoutingModule {
}
