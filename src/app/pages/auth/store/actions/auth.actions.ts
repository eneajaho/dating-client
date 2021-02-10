import { createAction, props } from '@ngrx/store';
import { Credentials, LoginResponse, Register } from '@auth/models';

/* Auth */

export const guardLogout = createAction('[Auth Guard] Logout');

export const logout = createAction('[User Logout] Logout');

export const redirectToAuth = createAction('[Auth Guard] Auth Redirect');

export const getUserLocal = createAction('[INIT] Get User From LocalStorage',
  props<{ user: LoginResponse }>()
);


/* Login */
export const login = createAction('[Login Page] Login Request',
  props<{ credentials: Credentials }>()
);

export const loginSuccess = createAction('[Auth/API] Login Success',
  props<{ user: LoginResponse }>()
);

export const loginFailure = createAction('[Auth/API] Login Failure',
  props<{ error: string }>()
);

export const clearLoginError = createAction('[Login Page] Clear Login Error');


/* Register */
export const register = createAction('[Register Page] Register',
  props<{ credentials: Register }>()
);

export const registerSuccess = createAction('[Auth/API] Register Success');

export const registerFailure = createAction('[Auth/API] Register Failure',
  props<{ error: string }>()
);

export const clearRegisterError = createAction(
  '[Register Page] Clear Register Page Error'
);
