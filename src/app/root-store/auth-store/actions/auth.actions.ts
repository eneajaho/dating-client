import { createAction, props } from '@ngrx/store';
import { Credentials } from "@pages/auth/models/Credentials";
import { LoginResponse } from "@pages/auth/models/LoginResponse";


// login actions
export const LOGIN_REQUEST = createAction(
  '[Login Page] Login Request', props<{ credentials: Credentials }>());

export const LOGIN_SUCCESS = createAction(
  '[Login Page] Login Success', props<{ user: LoginResponse }>());

export const LOGIN_FAILURE = createAction(
  '[Login Page] Login Failure', props<{ error }>());


// register actions
export const REGISTER_REQUEST = createAction(
  '[Register Page] Register Request', props<{ credentials: Credentials }>());

export const REGISTER_SUCCESS = createAction(
  '[Register Page] Register Success', props<{ user: LoginResponse }>());

export const REGISTER_FAILURE = createAction(
  '[Register Page] Register Failure', props<{ error }>());


// logout action
export const LOGOUT = createAction('[Navigation] Logout');

