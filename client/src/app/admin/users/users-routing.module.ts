import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent
  }
  

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AdminUsersRoutingModule { }
