import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Message } from '../../../api/message';
import { AppState } from '../../../app.reducer';
import { selectMessages } from './ngrx/chat.selectors'; // Import selector to select messages

@Component({
    templateUrl: './chat.app.component.html'
})
export class ChatAppComponent implements OnDestroy {

    messages$: Observable<Message[]>; // Observable of messages from the store
    subscription!: Subscription; // Optional subscription if needed in the future

    constructor(private store: Store<AppState>) {
        // Select messages from the store
        this.messages$ = this.store.select(selectMessages);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe(); // Unsubscribe if a subscription exists
        }
    }
}
