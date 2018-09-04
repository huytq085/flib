import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebsiteComponent} from './website.component';
import {CartComponent} from './cart/cart.component';

import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {path: '', redirectTo: '/book/page/1', pathMatch: 'full'},
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
      },
      {
        path: 'book',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})

export class WebsiteRoutingModule {
}