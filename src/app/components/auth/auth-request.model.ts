//auth-request.model.ts

export interface RegisterRequest {
    id?: number;
    username: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password: string;
    password2: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
