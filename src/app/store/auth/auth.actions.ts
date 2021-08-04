import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../pages/auth/models/AuthUser';


export const guardLogout = createAction('[Auth Guard] Logout');

export const logout = createAction('[User Logout] Logout');

export const redirectToAuth = createAction('[Auth Guard] Auth Redirect');

export const getUserLocal = createAction('[INIT] Get User From LocalStorage',
  props<{ user: AuthUser }>()
);


export const loginSuccess = createAction('[Auth/API] Login Success',
  props<{ user: AuthUser }>()
);

export const registerUserSuccess = createAction('[Auth/API] Register User Success',
  props<{ user: AuthUser }>()
);
