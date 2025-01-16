// login.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Add ReactiveFormsModule
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { RippleModule } from 'primeng/ripple';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        ReactiveFormsModule, // Ensure this is imported
        AppConfigModule,
        RippleModule,
        ProgressSpinnerModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
