import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/User";

export const recoverPassword = createAction("[Recover password]");
export const recoveredPasswordSuccess = createAction("[Recovered password] success");
export const recoveredPasswordFailed = createAction("[Recovered password] failed", props<{error: any}>());
export const resetPasswordRecoveryFlag = createAction("[Recovered password] reset Recoverd Password flag");

export const login = createAction("[Login]");
export const loginSuccess = createAction("[Login] success", props<{user: User}>());
export const loginFailed = createAction("[Login]  failed", props<{error: any}>());