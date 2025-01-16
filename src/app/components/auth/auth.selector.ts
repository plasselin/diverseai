// src/app/components/auth/auth.selector.ts

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

/**
 * @selector
 * @description
 * Selects the entire authentication state.
 */
export const selectAuthState = createFeatureSelector<AuthState>('auth');

/**
 * @selector
 * @description
 * Selects the user data from the authentication state.
 */
export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);

/**
 * @selector
 * @description
 * Selects the loading state from the authentication state.
 */
export const selectAuthLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
);

/**
 * @selector
 * @description
 * Selects the error message from the authentication state.
 */
export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);

/**
 * @selector
 * @description
 * Selects the success message related to authentication processes from the state.
 */
export const selectAuthSuccessMessage = createSelector(
    selectAuthState,
    (state: AuthState) => state.emailConfirmationMessage
);

/**
 * @selector
 * @description
 * Selects the authentication status (isAuthenticated) based on the presence and validity of the access token.
 */
export const isAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => !!state.accessToken && !state.isTokenExpired
);

/**
 * @selector
 * @description
 * Selects the limit reached status from the authentication state.
 */
export const selectIsLimitReached = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLimitReached
);
