import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteComponent } from './website.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
    {
        path: '',
        component: WebsiteComponent,
        children: [
            { path: '', redirectTo: '/book', pathMatch: 'full' },
            {
                path: 'profile',
                loadChildren: './profile/profile.module#ProfileModule'
            },
            {
                path: 'book',
                loadChildren: './home/home.module#HomeModule'
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class WebsiteRoutingModule { }
