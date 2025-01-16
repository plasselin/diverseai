export interface Message {
    email: string;
    text: string;
    sender?: string;
    isVoiceEnabled?: boolean;
    audioFileUrl?: string;
    temperature?: any; /*float in backend not sure what it is in angular */
    model?: string;
}
