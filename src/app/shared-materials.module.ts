import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { MatIconModule } from '@angular/material/icon';
import { CardModule } from "primeng/card";
import { PanelModule } from "primeng/panel";
import { DividerModule } from "primeng/divider";
import { FileUploadModule } from "primeng/fileupload";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        RippleModule,
        MatIconModule,
        FileUploadModule
    ],
    exports: [
        ButtonModule,
        TableModule,
        CardModule,
        RippleModule,
        PanelModule,
        DividerModule,
    ]
})
export class SharedMaterialsModule { }
