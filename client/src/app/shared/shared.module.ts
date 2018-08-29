import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent } from '.';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBookComponent } from './forms/form-book/form-book.component';
import { FormUserComponent } from './forms/form-user/form-user.component';
import { ImageUploadComponent } from './image-helper/image-upload/image-upload.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FormBookComponent,
    FormUserComponent,
    ImageUploadComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormBookComponent,
    ReactiveFormsModule,
    FormsModule,
    FormUserComponent
  ]
})
export class SharedModule { }
