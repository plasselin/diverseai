// auth-response.model.ts

export interface LoginResponse {
    access: string;
    refresh: string;
    user?: {
        email: string;
        username?: string;
        profilepic?: string;
        isValidated: boolean;
        isStaff: boolean;
        isLimitReached: boolean;
        userLimit: number;
        currentPromptCount: number;
        isPromptDisabled: boolean;
    };
}
