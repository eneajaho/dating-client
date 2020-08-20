import { createAction, props } from "@ngrx/store";
import { LoginResponse } from "@auth/models";

export const guardLogout = createAction(
  '[Auth Guard] Logout'
);

export const logout = createAction(
  '[User Logout Event] Logout'
);

export const authRedirect = createAction(
  '[Auth Guard] Auth Redirect'
);

export const getUserLocal = createAction(
  '[INIT] Get User From LocalStorage',
  props<{ user: LoginResponse }>()
);
