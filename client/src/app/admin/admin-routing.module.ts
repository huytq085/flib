import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './home';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent
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
