import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './home';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    SharedModule
  ],
  exports:[AdminHomeComponent],
  declarations: [AdminHomeComponent, AdminComponent]
})
export class AdminModule { }
