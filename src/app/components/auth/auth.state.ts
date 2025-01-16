/**
 * @interface
 * @description
 * Represents the structure of the authentication slice of the NgRx store,
 * encompassing user information, tokens, loading states, error messages,
 * email confirmation status, activation status, and prompt limit status.
 */
export interface AuthState {

    /**
     * @property {boolean} isTokenExpired
     * @description
     * Boolean to indicate if the JWT token has expired.
     */
    isTokenExpired: boolean;

    /**
     * @property {any | null} user
     *
     * Holds the authenticated user's profile data. It is null when no user is logged in.
     */
    user: any | null;

    /**
     * @property {string | null} accessToken
     * @description
     * Stores the JWT access token used for authenticating API requests.
     */
    accessToken: string | null;

    /**
     * @property {string | null} refreshToken
     * @description
     * Stores the JWT refresh token used to obtain new access tokens.
     */
    refreshToken: string | null;

    /**
     * @property {boolean} loading
     * @description
     * Indicates whether an authentication-related operation (e.g., login, registration) is in progress.
     */
    loading: boolean;

    /**
     * @property {string | null} error
     * @description
     * Contains error messages from failed authentication operations.
     */
    error: string | null;

    /**
     * @property {string | null} emailConfirmationMessage
     * @description
     * Holds messages related to email confirmation processes, such as success or failure notifications.
     */
    emailConfirmationMessage: string | null;

    /**
     * @property {boolean} isAuthenticated
     * @description
     * Indicates whether the user is authenticated (based on the access token).
     */
    isAuthenticated: boolean;

    /**
     * @property {boolean} isLimitReached
     * @description
     * Indicates whether the user has reached the prompt limit.
     */
    isLimitReached: boolean;
}
