// src/app/components/apps/chat/ngrx/chat.actions.ts
import { createAction, props } from '@ngrx/store';
import {Message} from "../../../../api/message";


// Actions for handling regular chat messages
export const sendMessage = createAction('[Chat] Send Message', props<{ message: Message }>());
export const sendMessageSuccess = createAction('[Chat] Send Message Success', props<{ message: Message }>());
export const sendMessageFailure = createAction('[Chat] Send Message Failure', props<{ error: string }>());
export const receiveMessage = createAction('[Chat] Receive Message', props<{ message: Message }>());

// Actions for speech-to-text (Whisper)
export const startSpeechToText = createAction('[Speech-to-Text] Start Transcription', props<{ audioBlob: Blob }>());
export const speechToTextSuccess = createAction('[Speech-to-Text] Transcription Success', props<{ text: string, sender: string }>());
export const speechToTextFailure = createAction('[Speech-to-Text] Transcription Failure', props<{ error: string }>());

// Action for model parameters
export const updateTemperature = createAction('[Chat] Update Temperature', props<{ temperature: number }>());
export const updateModel = createAction('[Chat] Update Model', props<{ model: string }>());
