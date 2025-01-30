import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { HomeComponent } from './components/home-component/home-component';
import { InfoComponent } from './components/info-component/info-component';
import { ChatbotsComponent } from './components/chatbots-component/chatbots-component';
import { ProfileComponent } from './components/profile-component/profile-component';
import { AuthGuard } from './guards/auth.guard';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
};

const routes: Routes = [
    // Main application layout with AuthGuard
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: '', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
            { path: 'code', component: ChatbotsComponent, canActivate: [AuthGuard] },
            {
                path: 'assistant',
                loadChildren: () =>
                    import('./components/apps/chat/chat.app.module').then((m) => m.ChatAppModule),
                canActivate: [AuthGuard],
            },
        ],
    },

    {
        path: 'auth',
        loadChildren: () =>
            import('./components/auth/auth.module').then((m) => m.AuthModule),
    },

    {
        path: 'data',
        canActivate: [],
        children: [],
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
