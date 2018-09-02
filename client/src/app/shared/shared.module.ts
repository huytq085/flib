import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent, FooterComponent} from '.';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormBookComponent} from './forms';
import {FormUserComponent} from './forms/form-user/form-user.component';
import {ImageUploadComponent} from './image-helper/image-upload/image-upload.component';
import {WebsiteModule} from '../website/website.module';
import {SearchBookComponent} from './search-book/search-book.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {LeftSidebarComponent} from './layout';
import {FilterBookComponent} from './layout/left-sidebar/filter-book/filter-book.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FormBookComponent,
    FormUserComponent,
    SearchBookComponent,
    ImageUploadComponent,
    LeftSidebarComponent,
    FilterBookComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    NgbModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormBookComponent,
    ReactiveFormsModule,
    FormsModule,
    FormUserComponent,
    SearchBookComponent,
    ImageUploadComponent,
    LeftSidebarComponent
  ]
})
export class SharedModule {
}
