import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './website/home/home.module';
import { HttpTokenInterceptor } from './core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { AccountComponent } from './test/account/account.component';
import { NewAccountComponent } from './test/new-account/new-account.component';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { TokenStorage } from './auth/authority/token.storage';



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AccountComponent,
    NewAccountComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
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
