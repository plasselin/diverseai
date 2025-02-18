import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from "../../../../api/message";

@Injectable()
export class ChatService {
    constructor(private http: HttpClient) {}

    sendMessageToBackend(message: Message): Observable<any> {
        return this.http.post<any>('https://diverse-data.com/chatapi/chat/completion/', { message: message });
    }
}
