import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from './core';


const routes: Routes = [
  {
    path: '',
    loadChildren: './website/website.module#WebsiteModule',
    // pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]

})
export class AppRoutingModule { }
