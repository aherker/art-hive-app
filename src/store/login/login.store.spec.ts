import { LoginState } from "./LoginState"
import { login, loginFailed, loginSuccess, recoverPassword, recoveredPasswordFailed, recoveredPasswordSuccess } from "./login.actions"
import { loginReducer } from "./login.reducers"
import { AppInitialState } from "../AppInitialState"
import { User } from "src/app/model/user/User"

describe("Login store", () => {
    it('recoverPassword', () =>{
        const initialState: LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoverPassword());
        expect(newState).toEqual({
            ...initialState,
            error: null, 
            isRecoveredPassword: false,
            isRecoveringPassword: true
        })
    })

    it('recoverPasswordSuccess', () =>{
        const initialState: LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoveredPasswordSuccess());
        expect(newState).toEqual({
            ...initialState,
            error: null, 
            isRecoveredPassword: true,
            isRecoveringPassword: false
        })
    })

    it('recoverPasswordFailed', () =>{
        const initialState: LoginState = AppInitialState.login;

        const error = {error: 'error'};
        const newState = loginReducer(initialState, recoveredPasswordFailed({error}));
        expect(newState).toEqual({
            ...initialState,
            error, 
            isRecoveredPassword: false,
            isRecoveringPassword: false
        })
    })

    it('login', () =>{
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, login());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true
        })
    })

    it('loginSuccess', () =>{
        const initialState: LoginState = AppInitialState.login;
        const user = new User();
        user.id = "anyID";
        const newState = loginReducer(initialState, loginSuccess({user}));
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isLoggedIn: true,
            isLoggingIn: false
        })
    })

    it('loginFailed', () =>{
        const initialState: LoginState = AppInitialState.login;
        const error = {error: 'error'};
        const newState = loginReducer(initialState, loginFailed({error}));
        expect(newState).toEqual({
            ...initialState,
            error,
            isLoggedIn: false,
            isLoggingIn: false
        })
    })
})