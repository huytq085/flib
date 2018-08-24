import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/book', pathMatch: 'full' },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  { path: 'book', loadChildren: './home/home.module#HomeModule' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { enableTracing: true })]
})
export class AppRoutingModule { }
