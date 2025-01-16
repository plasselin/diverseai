import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { HomeComponent } from './components/home-component/home-component';
import { SharedMaterialsModule } from './shared-materials.module';
import { AuthModule } from './components/auth/auth.module'; // Ensure AuthModule is imported
import { reducers, metaReducers } from './app.reducer';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { environment } from '../environments/environment';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { CookieService } from 'ngx-cookie-service';
import {AuthEffects} from "./components/auth/auth.effects";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {InfoComponent} from "./components/info-component/info-component";
import {ChatbotsComponent} from "./components/chatbots-component/chatbots-component";
import {AutomationComponent} from "./components/automation-component/automation-component";
import {UseCasesComponent} from "./components/usecases-component/usecases-component";
import {LecturerComponent} from "./components/lecturer-component/lecturer-component";
import {AssistantComponent} from "./components/assistant-component/assistant-component";
import {ManagerComponent} from "./components/manager-component/manager-component";
import {DataAnalystComponent} from "./components/dataAnalyst-component/dataAnalyst-component";
import {CustomizedComponent} from "./components/customized-component/customized-component";
import {FaqComponent} from "./components/faq-component/faq-component";
import {ChatEffects} from "./components/apps/chat/ngrx/chat.effects";
import {ChatService} from "./components/apps/chat/service/chat.service";
import {ProfileComponent} from "./components/profile-component/profile-component";

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        HomeComponent,
        InfoComponent,
        ChatbotsComponent,
        AutomationComponent,
        UseCasesComponent,
        LecturerComponent,
        AssistantComponent,
        ManagerComponent,
        DataAnalystComponent,
        CustomizedComponent,
        FaqComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppLayoutModule,
        SharedMaterialsModule,
        AuthModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([AuthEffects, ChatEffects]),
        !environment.production ? StoreDevtoolsModule.instrument({
            maxAge: 25,
        }) : [],
    ],
    providers: [CookieService, provideAnimationsAsync(), ChatService],
    bootstrap: [AppComponent]
})
export class AppModule {}
