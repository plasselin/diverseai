import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundRoutingModule } from './notfound-routing.module';
import { NotFoundComponent } from './notfound.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        NotfoundRoutingModule,
        ButtonModule,
        RippleModule
    ],
    declarations: [NotFoundComponent]
})
export class NotfoundModule { }
