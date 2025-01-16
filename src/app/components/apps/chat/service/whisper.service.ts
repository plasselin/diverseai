// src/app/components/apps/chat/service/whisper.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WhisperService {
    private apiUrl = environment.apiUrl;  // Backend API URL

    constructor(private http: HttpClient) {}

    transcribeAudio(audioBlob: Blob): Observable<any> {
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.wav');

        // Send the request to your backend API
        return this.http.post<any>(`${this.apiUrl}/transcribe/`, formData);
    }

}
