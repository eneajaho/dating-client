import { createAction, props } from "@ngrx/store";
import { User } from "@core/models";
import { LoginResponse } from "@auth/models";

export const logout = createAction(
  '[Auth Guard] Logout'
);

export const authRedirect = createAction(
  '[Auth Guard] Auth Redirect'
);

export const getUserLocal = createAction(
  '[INIT] Get User From LocalStorage',
  props<{ user: LoginResponse }>()
);
