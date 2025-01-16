import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../service/chat.service';
import {Message} from "../../../../api/message";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {
    @Input() messages: Message[] = []; // Array of messages
    lastMessage!: Message; // Stores the last message

    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        if (this.messages.length > 0) {
            this.lastMessage = this.messages[this.messages.length - 1];
        }
    }

    // Method to change view based on the sender (assistant or user)
    changeView(message: Message) {
        if (message.sender === 'assistant') {
            // Logic for changing the view when the assistant sends the message
            console.log('View changed to assistant message');
        } else if (message.sender === 'user') {
            // Logic for changing the view when the user sends the message
            console.log('View changed to user message');
        }
    }
}
