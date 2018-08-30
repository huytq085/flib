import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebsiteRoutingModule} from './website-routing.module';
import {WebsiteComponent} from './website.component';
import {AuthModule} from './auth/auth.module';
import {CartComponent} from './cart/cart.component';

@NgModule({
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule,
    AuthModule

  ],
  declarations: [WebsiteComponent, CartComponent]
})
export class WebsiteModule { }
