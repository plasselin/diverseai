import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatAppRoutingModule } from './chat.app-routing.module';
import { ChatAppComponent } from './chat.app.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { UserCardComponent } from './user-card/user-card.component';
import { RippleModule } from 'primeng/ripple';
import {FileUploadModule} from "primeng/fileupload";
import {ChatBoxComponent} from "./chat-box/chat-box.component";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChatAppRoutingModule,
        AvatarModule,
        InputTextModule,
        ButtonModule,
        BadgeModule,
        OverlayPanelModule,
        RippleModule,
        FileUploadModule,
        DropdownModule,
        SliderModule,
        MatIcon,
        MatIconButton,
        MatTooltip
    ],
    declarations: [
        ChatSidebarComponent,
        ChatAppComponent,
        UserCardComponent,
        ChatBoxComponent
    ],
    providers: [
    ]
})
export class ChatAppModule { }
