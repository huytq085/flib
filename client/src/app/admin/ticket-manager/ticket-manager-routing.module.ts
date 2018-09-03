import { TicketManagerComponent } from "./ticket-manager.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";

const routes: Routes = [
    {
      path: '',
      component: TicketManagerComponent
    },
    {
      path: ':id',
      component: TicketDetailComponent
    },  
  ];
  
  @NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
  })
  export class TicketManagerRoutingModule { }
