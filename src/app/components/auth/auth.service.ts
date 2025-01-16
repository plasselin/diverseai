// src/app/components/auth/auth.service.ts

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RegisterRequest, LoginRequest } from './auth-request.model';
import { LoginResponse } from './auth-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

/**
 * @service
 * @description
 * The AuthService manages authentication-related operations, including user registration,
 * login, email confirmation, and token management via cookies. It provides methods to
 * interact with the backend API and maintain authentication state.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8000/api/';
    private hostUrl = 'http://localhost:4200/';

    private jwtHelper = new JwtHelperService();

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {}

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}token/`, data).pipe(
            tap(response => {
                this.setToken('access_token', response.access);
                this.setToken('refresh_token', response.refresh);
            }),
            catchError(error => {
                console.error('Login error:', error);
                return throwError(() => new Error('Login failed'));
            })
        );
    }

    /**
     * Fetch the user profile using the access token.
     * @param {string} token - The access token for authentication.
     */
    getProfile(token: string): Observable<any> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
        return this.http.get<any>(`${this.apiUrl}profile/`, { headers }).pipe(
            tap(profile => {
                console.log('User Profile:', profile);
            }),
            catchError(error => {
                console.error('Error fetching profile:', error);
                return throwError(() => new Error('Failed to fetch profile'));
            })
        );
    }

    private setToken(tokenName: string, token: string): void {
        localStorage.setItem(tokenName, token);
    }

    private getToken(tokenName: string): string | null {
        return localStorage.getItem(tokenName);
    }


    /**
     * @method
     * @name logout
     * @description
     * Logs out the user by removing authentication tokens from cookies.
     */
    logout(): void {
        this.removeToken('access_token');
        this.removeToken('refresh_token');
        // Optionally, clear local user data or reset user state here
    }

    /**
     * @method
     * @name removeToken
     * @description
     * Removes a token from cookies.
     * @param {string} tokenName - The name of the cookie to remove.
     */
    removeToken(tokenName: string): void {
        this.cookieService.delete(tokenName, '/');
    }

    /**
     * @method
     * @name getDecodedToken
     * @description
     * Decodes a JWT token to extract its payload.
     * @param {string} tokenName - The name of the cookie storing the token.
     * @returns {any} - The decoded token payload if token exists, otherwise null.
     */
    getDecodedToken(tokenName: string): any {
        const token = this.getToken(tokenName);
        return token ? this.jwtHelper.decodeToken(token) : null;
    }

    /**
     * @method
     * @name isTokenExpired
     * @description
     * Checks if a token is expired using JwtHelperService.
     * @param {string} tokenName - The name of the cookie storing the token.
     * @returns {boolean} - True if the token is expired or not present, false otherwise.
     */
    isTokenExpired(tokenName: string): boolean {
        const token = this.getToken(tokenName);
        return token ? this.jwtHelper.isTokenExpired(token) : true;
    }

    /**
     * @method
     * @name isAuthenticated
     * @description
     * Determines if the user is authenticated by checking the validity of the access token.
     * @returns {boolean} - True if authenticated, false otherwise.
     */
    isAuthenticated(): boolean {
        const token = this.getToken('access_token');
        return token != null && !this.jwtHelper.isTokenExpired(token);
    }
}
