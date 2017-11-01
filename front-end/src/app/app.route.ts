import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthComponent} from './auth/auth.component';
import {VerifiedComponent} from './verified/verified.component';

export const router:Routes =  [
    { path: '',redirectTo:'auth', pathMatch: 'full'},
    { path: 'auth', component : AuthComponent},
    { path: 'verified', component : VerifiedComponent}
];


export const routes: ModuleWithProviders = RouterModule.forRoot(router);
