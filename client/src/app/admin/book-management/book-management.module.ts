import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookManagementRoutingModule} from './book-management-routing.module';
import {BookManagementComponent} from './book-management.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { PaginationComponent } from './book-list/pagination/pagination.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './book-list/add/add.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BookManagementRoutingModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  declarations: [BookManagementComponent, BookListComponent, BookDetailComponent, PaginationComponent, AddComponent]
})
export class BookManagementModule {
}
