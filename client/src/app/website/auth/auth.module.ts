import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  declarations: [LoginComponent, RegisterComponent, AuthComponent]
})
export class AuthModule { }