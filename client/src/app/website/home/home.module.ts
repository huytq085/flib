import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './content/book-list/book-list.component';
import { BookDetailComponent } from './content/book-list/book-detail/book-detail.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home.component';
import { PaginationComponent } from './content/book-list/pagination/pagination.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ShowFilterComponent } from './show-filter/show-filter.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    BookListComponent,
    BookDetailComponent,
    ContentComponent,
    HomeComponent,
    PaginationComponent,
    ShowFilterComponent,
  ]
})
export class HomeModule { }
