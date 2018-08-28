import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule,
    AuthModule,
  ],
  declarations: [WebsiteComponent]
})
export class WebsiteModule { }
