import { createAction, props } from '@ngrx/store';
import { Login } from "../../models/Login.model";
import { User } from "../../models/User.model";


// login actions
export const LOGIN_REQUEST = createAction(
  '[Login Page] Login Request', props<{ credentials: Login }>());

export const LOGIN_SUCCESS = createAction(
  '[Login Page] Login Success', props<{ user: User }>());

export const LOGIN_FAILURE = createAction(
  '[Login Page] Login Failure', props<{ error }>());


// register actions





// logout action
export const LOGOUT = createAction('[Navigation] Logout');

