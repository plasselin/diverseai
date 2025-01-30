// src/app/components/auth/login/login.component.ts

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import * as AuthActions from '../auth.actions';
import { Observable } from 'rxjs';
import {isAuthenticated, selectAuthError, selectAuthLoading} from '../auth.selector';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage$: Observable<string | null>;
    loading$: Observable<boolean>;
    isAuthenticated$: Observable<boolean>;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private cdr: ChangeDetectorRef
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });

        this.isAuthenticated$ = this.store.pipe(select(isAuthenticated));
        this.errorMessage$ = this.store.pipe(select(selectAuthError));
        this.loading$ = this.store.pipe(select(selectAuthLoading));
    }

    ngOnInit(): void {
        this.isAuthenticated$.subscribe((isAuthenticated) => {
            if (isAuthenticated) {
                this.cdr.detectChanges();
                // console.log('User is authenticated, proceed to next route');
            }
        });
    }

    /**
     * @method
     * @name onSubmit
     * @description
     * Dispatches the login action with form data when the form is submitted.
     */
    onSubmit(): void {
        if (this.loginForm.valid) {
            const loginData = this.loginForm.value;
            // console.log('Login form data:', loginData );
            this.store.dispatch(AuthActions.login({ loginData }));        }
    }
}
