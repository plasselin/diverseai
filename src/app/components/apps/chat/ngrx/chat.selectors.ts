// src/app/components/apps/chat/ngrx/chat.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from './chat.state';

export const selectChatState = createFeatureSelector<ChatState>('chat');

export const selectMessages = createSelector(
    selectChatState,
    (state: ChatState) => state.messages
);

export const selectTranscribedText = createSelector(
    selectChatState,
    (state: ChatState) => state.transcribedText
);

export const selectTemperature = createSelector(
    selectChatState,
    (state: ChatState) => state.temperature
);

export const selectModel = createSelector(
    selectChatState,
    (state: ChatState) => state.model
);
