// src/app/components/apps/chat/ngrx/chat.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { ChatState, initialChatState } from './chat.state';
import * as ChatActions from './chat.actions';

export const chatReducer = createReducer(
    initialChatState,

    on(ChatActions.sendMessage, (state, { message }) => ({
        ...state,
        messages: [...state.messages, message],
        loading: true,
    })),

    on(ChatActions.receiveMessage, (state, { message }) => ({
        ...state,
        messages: [...state.messages, message],
        loading: false,
    })),

    on(ChatActions.sendMessageFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(ChatActions.startSpeechToText, (state) => ({
        ...state,
        loading: true,
    })),

    on(ChatActions.speechToTextSuccess, (state, { text, sender }) => ({
        ...state,
        loading: false,
        transcribedText: text,
    })),

    on(ChatActions.speechToTextFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(ChatActions.updateTemperature, (state, { temperature }) => ({
        ...state,
        temperature,
    })),

    on(ChatActions.updateModel, (state, { model }) => ({
        ...state,
        model,
    })),

);
