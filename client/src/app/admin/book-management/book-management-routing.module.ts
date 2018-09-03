import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BookManagementComponent} from './book-management.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailComponent} from './book-detail/book-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BookManagementComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/book/page/1',
        pathMatch: 'full'
      },
      {
        path: 'page/:number',
        component: BookListComponent
      },
      {
        path: ':id',
        component: BookDetailComponent
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class BookManagementRoutingModule {
}
