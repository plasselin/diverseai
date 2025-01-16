import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ChatActions from './chat.actions';
import {ChatService} from "../service/chat.service";
import {WhisperService} from "../service/whisper.service";

@Injectable()
export class ChatEffects {
    constructor(
        private actions$: Actions,
        private chatService: ChatService,
        private whisperService: WhisperService,
    ) {
        console.log('ChatEffects initialized!');
    }


    sendMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChatActions.sendMessage),
            switchMap(action =>
                this.chatService.sendMessageToBackend(action.message).pipe(
                    map(response =>
                        ChatActions.receiveMessage({
                            message: {
                                text: response.text,
                                sender: response.sender,
                                isVoiceEnabled: response.isVoiceEnabled,
                                audioFileUrl: response.audio_file || '',
                                email: ''
                            },
                        })
                    ),
                    catchError(error => {
                        if (error.status === 403) {
                            // Dispatch a specific message indicating the prompt limit has been reached
                            return of(
                                ChatActions.receiveMessage({
                                    message: {
                                        text: 'You have reached your prompt limit. Please contact the webmaster for more access.',
                                        sender: 'assistant',
                                        isVoiceEnabled: false,
                                        audioFileUrl: '',
                                        email: ''
                                    },
                                })
                            );
                        }
                        return of(ChatActions.sendMessageFailure({ error }));
                    })
                )
            )
        )
    );


    // Effect to handle speech-to-text transcription
    transcribeAudio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChatActions.startSpeechToText),
            switchMap((action) =>
                this.whisperService.transcribeAudio(action.audioBlob).pipe(
                    map((response) =>
                        ChatActions.speechToTextSuccess({
                            text: response.text,
                            sender: response.sender,
                        })
                    ),
                    catchError((error) =>
                        of(ChatActions.speechToTextFailure({ error: error.message }))
                    )
                )
            )
        )
    );
}

