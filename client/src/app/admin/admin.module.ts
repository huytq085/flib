import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './home';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports:[AdminHomeComponent],
  declarations: [AdminHomeComponent]
})
export class AdminModule { }
