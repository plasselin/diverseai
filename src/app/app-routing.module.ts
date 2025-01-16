import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { HomeComponent } from './components/home-component/home-component';
import { InfoComponent } from './components/info-component/info-component';
import { ChatbotsComponent } from './components/chatbots-component/chatbots-component';
import { AutomationComponent } from './components/automation-component/automation-component';
import { UseCasesComponent } from './components/usecases-component/usecases-component';
import { LecturerComponent } from './components/lecturer-component/lecturer-component';
import { ManagerComponent } from './components/manager-component/manager-component';
import { DataAnalystComponent } from './components/dataAnalyst-component/dataAnalyst-component';
import { CustomizedComponent } from './components/customized-component/customized-component';
import { FaqComponent } from './components/faq-component/faq-component';
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./components/profile-component/profile-component";

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
};

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'info', component: InfoComponent },
            { path: 'code', component: ChatbotsComponent },
            {
                path: 'assistant',
                loadChildren: () => import('./components/apps/chat/chat.app.module').then(m => m.ChatAppModule)
            },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./components/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '**',
        redirectTo: 'auth',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
