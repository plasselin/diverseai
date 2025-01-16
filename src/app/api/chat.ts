import { Message } from './message';

export interface Chat {
    userId: number;
    name: string;
    sender: string;
    messages: Message[];
    status: string;
}
