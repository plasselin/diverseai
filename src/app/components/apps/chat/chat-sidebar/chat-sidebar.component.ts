import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import * as ChatActions from '../ngrx/chat.actions';  // Import the actions

@Component({
    selector: 'app-chat-sidebar',
    templateUrl: './chat-sidebar.component.html',
    styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit {

    temperature: number = 0.5;
    selectedModel: string = 'gpt-4o-mini';

    modelOptions = [
        { label: 'GPT-4o', value: 'gpt-4o' },
        { label: 'GPT-4o-mini', value: 'gpt-4o-mini' }
    ];

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {

        this.store.dispatch(ChatActions.updateModel({ model: this.selectedModel }));
        this.store.dispatch(ChatActions.updateTemperature({ temperature: this.temperature }));

        console.log('Initial Model:', this.selectedModel);
        console.log('Initial Temperature:', this.temperature);
    }

    logTemperature() {
        console.log('Updated Temperature:', this.temperature);
        this.store.dispatch(ChatActions.updateTemperature({ temperature: this.temperature }));
    }

    logModel() {
        console.log('Selected Model:', this.selectedModel);
        this.store.dispatch(ChatActions.updateModel({ model: this.selectedModel }));
    }
}
