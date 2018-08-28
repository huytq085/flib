import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFooterComponent, AdminHeaderComponent } from '.';
import { AdminSidebarComponent } from './layout/admin/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent
  ],
  declarations: [AdminFooterComponent, AdminHeaderComponent, AdminSidebarComponent]
})
export class CoreModule { }