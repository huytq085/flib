import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { HomeModule } from './home';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule
    
  ],
  declarations: [WebsiteComponent]
})
export class WebsiteModule { }
