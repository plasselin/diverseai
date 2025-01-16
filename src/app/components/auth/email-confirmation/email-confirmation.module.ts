import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import {EmailConfirmationComponent} from "./email-confirmation.component";
import {RouterLink} from "@angular/router";
import {EmailConfirmationRoutingModule} from "./email-comfirmation-routing.modules";

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        AppConfigModule,
        RouterLink,
        EmailConfirmationRoutingModule
    ],
    declarations: [EmailConfirmationComponent]
})
export class EmailConfirmationModule { }
