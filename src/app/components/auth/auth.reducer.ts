import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state';

/**
 * @constant
 * @description
 * Defines the initial state of the authentication slice in the NgRx store.
 */
export const initialAuthState: AuthState = {
    isTokenExpired: true,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    emailConfirmationMessage: null,
    isAuthenticated: false,
    isLimitReached: false,
};

/**
 * @description
 * The authReducer function handles state transitions based on dispatched authentication actions.
 */
export const authReducer = createReducer(
    initialAuthState,

    // -----------------------
    // Login Handlers
    // -----------------------

    /**
     * Handles the 'login' action by setting loading to true and clearing any previous errors.
     */
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    /**
     * Handles the 'loginSuccess' action by storing access and refresh tokens,
     * and resetting loading and errors.
     */
    on(AuthActions.loginSuccess, (state, { response }) => ({
        ...state,
        accessToken: response.access ?? null,
        refreshToken: response.refresh ?? null,
        user: {
            ...state.user, // Keep any existing user data
            ...response.user, // Merge with new data from the login response
        },
        isTokenExpired: false,
        isAuthenticated: true,
        loading: false,
        error: null,
    })),

    /**
     * Handles the 'loginFailure' action by setting loading to false and updating the error message.
     */
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error.message || 'Login failed.',
    })),

    on(AuthActions.requestProfile, (state) => ({
        ...state,
        loadingProfile: true,
        error: null,
    })),

    // Profile fetch success
    on(AuthActions.requestProfileSuccess, (state, { profile }) => ({
        ...state,
        user: {
            ...state.user, // Keep any existing user data
            ...profile, // Merge with new profile data
        },
        isLimitReached: profile.isLimitReached, // Use the updated profile data
        loading: false,
        error: null,
    })),

    // Profile fetch failure
    on(AuthActions.requestProfileFailure, (state, { error }) => ({
        ...state,
        loadingProfile: false,
        error: error,
    })),

    // -----------------------
    // Logout Handler
    // -----------------------

    /**
     * Handles the 'logout' action by clearing user data, tokens, resetting loading and errors,
     * and setting 'isActive' to false.
     */
    on(AuthActions.logout, (state) => ({
        ...state,
        accessToken: null,
        refreshToken: null,
        isTokenExpired: true,
        isAuthenticated: false,
        isLimitReached: false,
        loading: false,
        error: null,
        emailConfirmationMessage: null,
    }))
);
