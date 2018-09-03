import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent } from './content/book-list/book-detail/book-detail.component';
import { HomeComponent } from './home.component';
import { ContentComponent } from './content/content.component';
import { ShowFilterComponent } from './show-filter/show-filter.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    { path: ':id', component: BookDetailComponent },
    { path: 'page/:number', component: ContentComponent },
    { path: 'page/:filter', component: ShowFilterComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
