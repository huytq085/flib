import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpTokenInterceptor} from './core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenStorage} from './website/auth/authority/token.storage';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TokenStorage, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
