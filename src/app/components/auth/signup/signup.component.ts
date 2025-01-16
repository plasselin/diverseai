import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import * as AuthActions from '../auth.actions';
import { Observable } from 'rxjs';
import { selectAuthError, selectAuthLoading, selectAuthSuccessMessage } from '../auth.selector';
import { AuthService } from '../auth.service';
import { RegisterRequest } from '../auth-request.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    errorMessage$: Observable<string | null>;
    successMessage$: Observable<string | null>;
    loading$: Observable<boolean>;
    formErrors: any = {};

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private authService: AuthService
    ) {
        this.signupForm = this.fb.group({
            username: ['', [Validators.required, Validators.maxLength(150)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            password2: ['', Validators.required],
        }, {
            validators: this.passwordMatchValidator
        });

        // Selectors for error messages, success messages, and loading state
        this.errorMessage$ = this.store.pipe(select(selectAuthError));
        this.successMessage$ = this.store.pipe(select(selectAuthSuccessMessage));
        this.loading$ = this.store.pipe(select(selectAuthLoading));
    }

    ngOnInit(): void { }

    passwordMatchValidator(form: FormGroup): null | { mismatch: true } {
        if (form.get('password')?.value !== form.get('password2')?.value) {
            form.get('password2')?.setErrors({ mismatch: true });
            return { mismatch: true };
        } else {
            return null;
        }
    }

    onSubmit(): void {
        if (this.signupForm.valid) {
            const registerData: RegisterRequest = this.signupForm.value as RegisterRequest;
            this.store.dispatch(AuthActions.register({ registerData }));
        }
    }
}
