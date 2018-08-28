import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin/home';


const routes: Routes = [
  {
    path: '',
    loadChildren: './website/website.module#WebsiteModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  }

];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
