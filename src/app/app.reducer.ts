import {
    ActionReducerMap,
    ActionReducer,
    MetaReducer,
} from "@ngrx/store";
import { environment } from "../environments/environment";

// Import AuthState and authReducer
import { AuthState } from './components/auth/auth.state';
import { authReducer } from './components/auth/auth.reducer';

// Import ChatState and chatReducer
import { ChatState } from './components/apps/chat/ngrx/chat.state';
import { chatReducer } from './components/apps/chat/ngrx/chat.reducer';

/**
 * @interface
 * @description
 * Represents the structure of the application's global state.
 */
export interface AppState {
    auth: AuthState;
    chat: ChatState;  // Add ChatState to AppState
}

/**
 * @constant
 * @description
 * Combines all feature reducers into a single reducer map.
 */
export const reducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    chat: chatReducer,  // Add chatReducer to the reducers map
};

/**
 * @function
 * @description
 * A meta-reducer that logs every action and state change.
 * Useful for debugging purposes.
 * @param {ActionReducer<any>} reducer
 * @returns {ActionReducer<any>}
 */
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log("state before: ", state);
        console.log("action", action);

        return reducer(state, action);
    };
}

/**
 * @constant
 * @description
 * Defines meta-reducers based on the environment.
 * In development, includes the logger meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger]
    : [];
