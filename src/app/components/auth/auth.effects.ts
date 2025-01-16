// src/app/components/auth/auth.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {ChatService} from "../apps/chat/service/chat.service";
import {select, Store} from "@ngrx/store";
import {selectAuthState} from "./auth.selector";

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private chatService: ChatService,
        private store: Store,
        private router: Router
    ) {
    }

    /**
     * @effect
     * Handles user login by calling AuthService's login method.
     * Dispatches loginSuccess or loginFailure based on API response.
     */
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap(action =>
                this.authService.login(action.loginData).pipe(
                    map(response => AuthActions.loginSuccess({response})), // Only handle the login success
                    catchError(error => of(AuthActions.loginFailure({error: error.message})))
                )
            )
        )
    );

    /**
     * @effect
     * Handles fetching the user profile after a successful login.
     * Dispatches requestProfileSuccess or requestProfileFailure.
     */
    fetchProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess), // Triggered after a successful login
            switchMap(({response}) => {
                const token = response.access;
                if (!token) {
                    return of(AuthActions.requestProfileFailure({error: 'Access token is missing.'}));
                }
                return this.authService.getProfile(token).pipe(
                    map(profile => AuthActions.requestProfileSuccess({profile})), // Dispatch profile with requestProfileSuccess
                    catchError(error =>
                        of(AuthActions.requestProfileFailure({error: error.message}))
                    )
                );
            })
        )
    );

    /**
     * @effect
     * Redirects the user upon successful profile fetch.
     */
    profileFetchSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(AuthActions.requestProfileSuccess),
                tap(() => {
                    this.router.navigate(['']); // Navigate to the home/dashboard page
                })
            ),
        {dispatch: false}
    );

    /**
     * @effect
     * Handles login failures by logging the error.
     * Optionally, you can dispatch notifications or other actions here.
     * Does not dispatch any action.
     */
    loginFailure$ = createEffect(() =>
            this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(action => {
                    console.error('Login failed:', action.error);
                })
            ),
        {dispatch: false}
    );

    /**
     * @effect
     * Handles user logout by calling AuthService's logout method.
     * Navigates the user to the login page.
     * Does not dispatch any action.
     */
    logout$ = createEffect(() =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    this.authService.logout(); // Logout the user
                    this.router.navigate(['auth/login']); // Navigate to login page
                })
            ),
        {dispatch: false}
    );
}
