import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent } from '.';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBookComponent } from './forms/form-book/form-book.component';
import { FormUserComponent } from './forms/form-user/form-user.component';
import { WebsiteModule } from '../website/website.module';
import { SearchBookComponent } from './search-book/search-book.component';
import { ImageUploadComponent } from './image-helper/image-upload/image-upload.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LeftSidebarComponent } from './layout/left-sidebar/left-sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FormBookComponent,
    FormUserComponent,
    SearchBookComponent,
    ImageUploadComponent,
    LeftSidebarComponent
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
    LeftSidebarComponent
  ]
})
export class SharedModule { }
