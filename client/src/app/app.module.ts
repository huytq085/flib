import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { HttpTokenInterceptor } from './core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { AccountComponent } from './test/account/account.component';
import { NewAccountComponent } from './test/new-account/new-account.component';



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AccountComponent,
    NewAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    HomeModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
