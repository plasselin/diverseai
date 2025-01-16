// src/app/components/auth/auth-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        /**
         * @description
         * Lazy loads the LoginModule when the 'login' path is accessed.
         */
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
/**
 * @module
 * @description
 * The AuthRoutingModule handles routing for authentication-related components,
 * enabling lazy loading to optimize application performance.
 */
export class AuthRoutingModule { }
