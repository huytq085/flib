import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent } from '.';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBookComponent } from './forms';
import { FormUserComponent } from './forms/form-user/form-user.component';
import { ImageUploadComponent } from './image-helper/image-upload/image-upload.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FormBookComponent,
    FormUserComponent,
    ImageUploadComponent,
    SearchBookComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormBookComponent,
    ReactiveFormsModule,
    FormsModule,
    FormUserComponent,
    SearchBookComponent,
    ImageUploadComponent
  ]
})
export class SharedModule { }
