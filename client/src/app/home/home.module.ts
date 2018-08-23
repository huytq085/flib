import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './content/book-list/book-list.component';
import { BookDetailComponent } from './content/book-list/book-detail/book-detail.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';
import { PaginationComponent } from './content/book-list/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BookListComponent,
    BookDetailComponent,
    ContentComponent,
    HomeComponent,
    PaginationComponent
  ]
})
export class HomeModule { }
