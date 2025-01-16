import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EmailConfirmationComponent} from "./email-confirmation.component";



@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EmailConfirmationComponent }  // When '/auth/signup' is accessed, load SignupComponent
    ])],
    exports: [RouterModule]
})
export class EmailConfirmationRoutingModule { }
