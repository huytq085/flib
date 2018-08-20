import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileContributeComponent } from './profile-contribute/profile-contribute.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'info',
        component: ProfileInfoComponent
      },
      {
        path: 'notification',
        component: ProfileInfoComponent
      },
      {
        path: 'order',
        component: ProfileInfoComponent
      },
      {
        path: 'favourite',
        component: ProfileInfoComponent
      },
      {
        path: 'contribute',
        component: ProfileContributeComponent
      }
    ]
  }

]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ProfileRoutingModule { }
