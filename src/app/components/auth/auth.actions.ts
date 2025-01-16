import { createAction, props } from '@ngrx/store';
import { LoginRequest } from './auth-request.model';
import { LoginResponse } from './auth-response.model';

/**
 * @description
 * Initiates the user login process with the provided login credentials.
 */
export const login = createAction(
    '[Auth] Login',
    props<{ loginData: LoginRequest }>()
);

/**
 * @description
 * Dispatched upon successful user login, carrying the login response (tokens).
 */
export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ response: LoginResponse }>() // Add profile as a prop
);


/**
 * @description
 * Dispatched when user login fails, carrying the error information.
 */
export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

/**
 * @description
 * Initiates the user logout process, clearing authentication data from the store and cookies.
 */
export const logout = createAction(
    '[Auth] Logout'
);

/**
 * Action to request the user profile.
 */
export const requestProfile = createAction(
    '[Auth] Request Profile'
);

/**
 * Action dispatched when the profile is successfully fetched.
 */
export const requestProfileSuccess = createAction(
    '[Auth] Request Profile Success',
    props<{ profile: {
            email: string;
            username?: string;
            profilepic?: string;
            isValidated: boolean;
            isStaff: boolean;
            isLimitReached: boolean;
            userLimit: number;
            currentPromptCount: number;
        } }>()
);

/**
 * Action dispatched when profile fetching fails.
 */
export const requestProfileFailure = createAction(
    '[Auth] Request Profile Failure',
    props<{ error: string }>()
);


export const AuthActions = {
    requestProfile,
    requestProfileFailure,
    requestProfileSuccess,
    login,
    logout,
    loginFailure,
    loginSuccess
};
