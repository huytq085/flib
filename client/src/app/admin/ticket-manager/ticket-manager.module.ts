import { TicketManagerComponent } from "./ticket-manager.component";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TicketManagerRoutingModule } from "./ticket-manager-routing.module";
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

@NgModule({
    imports: [
      CommonModule,
      TicketManagerRoutingModule,
      SharedModule,
      
    ],
    declarations: [
      TicketManagerComponent,
      TicketDetailComponent
    ]
  })
  export class TicketManagerModule { }