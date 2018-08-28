import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpTokenInterceptor } from './core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TestComponent } from './test/test.component';
import { AccountComponent } from './test/account/account.component';
import { NewAccountComponent } from './test/new-account/new-account.component';
import { AuthModule } from './website/auth/auth.module';
import { TokenStorage } from './website/auth/authority/token.storage';
import {HomeModule} from './website/home';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    AdminModule,
    AuthModule,
  ],
  providers: [TokenStorage,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
