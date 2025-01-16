import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Message } from '../../../../api/message';
import { AppState } from '../../../../app.reducer';
import * as ChatActions from '../ngrx/chat.actions';
import {selectMessages, selectModel, selectTemperature, selectTranscribedText} from '../ngrx/chat.selectors';
import { WhisperService } from '../service/whisper.service';
import { HttpClient } from "@angular/common/http";
import { Actions, ofType } from "@ngrx/effects";
import {filter, take} from "rxjs/operators";

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit {

    textContent: string = '';
    messages$: Observable<Message[]>;
    isVoiceEnabled = false;
    tooltip: string = 'Record Voice Message';
    recordingInterval: any;
    isRecording = false;
    recordingStartTime: number = 0;
    audioChunks: Blob[] = [];
    mediaRecorder!: MediaRecorder;
    audio = new Audio();
    audioQueue: string[] = [];
    isAudioPlaying = false;
    lastAssistantMessage: string = '';
    lastAssistantIndex: number = -1;
    hasAssistantResponse = false;
    transcribedText$: Observable<string | null | undefined>;
    temperature: number = 0.5;
    model: string = 'gpt-40-mini';

    constructor(
        private store: Store<AppState>,
        private cdr: ChangeDetectorRef,
        private actions$: Actions,
        private whisperService: WhisperService,
        private http: HttpClient,
    ) {

        this.messages$ = this.store.select(selectMessages);
        this.transcribedText$ = this.store.select(selectTranscribedText);
    }

    ngOnInit(): void {
        this.cdr.detectChanges();

        this.store.select(selectTemperature).subscribe(temp => {
            this.temperature = temp;
            console.log('Updated Temperature:', this.temperature);
        });

        this.store.select(selectModel).subscribe(mod => {
            this.model = mod;
            console.log('Updated Model:', this.model);
        });

        this.messages$.subscribe(messages => {
            const latestAssistantMessage = this.getLastAssistantMessage(messages);

            if (this.isVoiceEnabled && latestAssistantMessage && this.lastAssistantIndex < latestAssistantMessage.index) {
                this.lastAssistantMessage = latestAssistantMessage.message.text;
                this.lastAssistantIndex = latestAssistantMessage.index;
                this.hasAssistantResponse = true;
                this.cdr.detectChanges();

                if (latestAssistantMessage.message.audioFileUrl) {
                    this.queueAudio(latestAssistantMessage.message.audioFileUrl);
                }
            } else if (!latestAssistantMessage) {
                this.hasAssistantResponse = false;
            }
        });

        this.actions$.pipe(
            ofType(ChatActions.speechToTextSuccess),
            filter((action) => !!action.text)
        ).subscribe((action) => {
            this.handleSpeechToTextSuccess(action.text);
        });

        this.audio.addEventListener('ended', () => {
            this.isAudioPlaying = false;
            this.playNextInQueue();
            this.cdr.detectChanges();
        });
    }


    handleSpeechToTextSuccess(transcribedText: string): void {
        if (transcribedText.trim() === '') {
            return;
        }

        this.store.select('auth').pipe(take(1)).subscribe(authState => {
            const email = authState?.user?.email;

            if (!email) {
                console.error('User email is missing. Cannot send message.');
                return;
            }

            const userMessage: Message = {
                text: transcribedText,
                sender: 'user',
                isVoiceEnabled: this.isVoiceEnabled,
                temperature: this.temperature,
                model: this.model,
                email: email
            };

            this.store.dispatch(ChatActions.sendMessage({ message: userMessage }));
            this.textContent = '';
        });
    }


    getLastAssistantMessage(messages: Message[]): { message: Message, index: number } | undefined {
        const assistantMessages = messages
            .map((message, index) => ({ message, index }))
            .filter(({ message }) => message.sender === 'assistant');

        if (assistantMessages.length > 0) {
            return assistantMessages.reduce((prev, current) => (prev.index > current.index ? prev : current));
        }
        return undefined;
    }

    toggleVoice() {
        this.isVoiceEnabled = !this.isVoiceEnabled;

        if (this.isVoiceEnabled && !this.hasAssistantResponse) {
            console.log('TTS is on standby, waiting for the next assistant message.');
        }
    }

    queueAudio(audioUrl: string) {
        this.audioQueue.push(audioUrl);

        if (!this.isAudioPlaying) {
            this.playNextInQueue();
        }
    }

    playNextInQueue() {
        if (this.audioQueue.length > 0) {
            const nextAudioUrl = this.audioQueue.shift()!;
            this.audio.src = nextAudioUrl;
            this.audio.play().then(() => {
                this.isAudioPlaying = true;
                this.cdr.detectChanges();
            }).catch((error) => {
                console.error('Error playing audio:', error);
                this.isAudioPlaying = false;
                this.cdr.detectChanges();
            });
        }
    }

    stopPlayback() {
        if (this.isAudioPlaying) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audioQueue = [];
            this.isAudioPlaying = false;
            this.cdr.detectChanges();
        }
    }

    startRecording() {
        this.isRecording = true;
        this.recordingStartTime = Date.now();
        this.updateTooltip();

        this.recordingInterval = setInterval(() => {
            this.updateTooltip();
        }, 100);

        console.log('Recording started');

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start();
            this.audioChunks = [];
            this.mediaRecorder.ondataavailable = event => {
                this.audioChunks.push(event.data);
            };
        }).catch(error => {
            console.error('Error accessing microphone:', error);
        });
    }

    stopRecording() {
        this.isRecording = false;
        clearInterval(this.recordingInterval);
        this.tooltip = 'Record Voice Message';
        console.log('Recording stopped');

        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            this.mediaRecorder.onstop = () => {

                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const tracks = this.mediaRecorder.stream.getTracks();
                tracks.forEach((track) => track.stop());
                this.store.dispatch(ChatActions.startSpeechToText({ audioBlob }));
                console.log('Microphone tracks stopped');
            };
        }
    }


    updateTooltip() {
        this.cdr.detectChanges();
        const elapsedTime = (Date.now() - this.recordingStartTime) / 1000;
        this.tooltip = `Recording: ${elapsedTime.toFixed(1)}s`;
    }

    sendMessage() {
        if (this.textContent.trim() === '') {
            return;
        }

        this.store.select('auth').subscribe(authState => {
            const email = authState?.user?.email;

            if (!email) {
                console.error('User email is missing. Cannot send message.');
                return;
            }

            const userMessage: Message = {
                text: this.textContent,
                sender: 'user',
                isVoiceEnabled: this.isVoiceEnabled,
                temperature: this.temperature,
                model: this.model,
                email: email
            };

            this.store.dispatch(ChatActions.sendMessage({ message: userMessage }));

            this.textContent = '';
        });
    }


}
