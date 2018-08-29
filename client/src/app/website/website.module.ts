import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { HomeModule } from './home';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { CartComponent } from './cart/cart.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule,
    AuthModule,

  ],
  declarations: [WebsiteComponent, CartComponent],
  exports:[]
})
export class WebsiteModule { }
