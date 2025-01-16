import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppConfigModule } from "../../../layout/config/app.config.module";

@NgModule({
    declarations: [SignupComponent],
    imports: [
        CommonModule,
        SignupRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        AppConfigModule
    ]
})
export class SignupModule { }
