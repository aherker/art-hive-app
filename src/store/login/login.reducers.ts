import { Action, createReducer, on } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { recoverPassword, recoveredPasswordFailed, recoveredPasswordSuccess, login, loginFailed, loginSuccess } from "./login.actions";
import { AppInitialState } from "../AppInitialState";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    on(recoverPassword, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        };
    }),
    
    on(recoveredPasswordSuccess, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        };
    }),
    
    on(recoveredPasswordFailed, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        };
    }),

    on(login, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        }
    }),

    on(loginSuccess, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: true,
            isLoggingIn: false
        }
    }),

    on(loginFailed, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggedIn: false,
            isLoggingIn: false
        }
    })
)

export function loginReducer(state: LoginState, action: Action){
    return reducer (state ,action);
}