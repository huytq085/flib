import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin/home';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: './website/website.module#WebsiteModule'
  },
  { 
    path: 'admin', 
    loadChildren: './admin/admin.module#AdminModule'
  },
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ]
})
export class AppRoutingModule { }
