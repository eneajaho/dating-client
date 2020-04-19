import { createAction, props } from '@ngrx/store';
import { Login } from "../../../auth/models/Login.model";
import { User } from "../../../auth/models/User.model";


// login actions
export const LOGIN_REQUEST = createAction(
  '[Login Page] Login Request', props<{ credentials: Login }>());

export const LOGIN_SUCCESS = createAction(
  '[Login Page] Login Success', props<{ user: User }>());

export const LOGIN_FAILURE = createAction(
  '[Login Page] Login Failure', props<{ error }>());


// register actions
export const REGISTER_REQUEST = createAction(
  '[Register Page] Register Request', props<{ credentials: Login }>());

export const REGISTER_SUCCESS = createAction(
  '[Register Page] Register Success', props<{ user: User }>());

export const REGISTER_FAILURE = createAction(
  '[Register Page] Register Failure', props<{ error }>());


// logout action
export const LOGOUT = createAction('[Navigation] Logout');

