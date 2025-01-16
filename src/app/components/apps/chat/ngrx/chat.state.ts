// src/app/components/apps/chat/ngrx/chat.state.ts
import {Message} from "../../../../api/message";

export interface ChatState {
    messages: Message[];
    transcribedText?: string | null;
    loading: boolean;
    error: string | null;
    temperature: number;
    model: string;
}

export const initialChatState: ChatState = {
    messages: [],
    transcribedText: undefined,
    loading: false,
    error: null,
    temperature: 0.5,
    model: 'gpt-40-mini'
};
