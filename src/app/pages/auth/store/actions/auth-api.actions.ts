import { createAction, props } from '@ngrx/store';
import { LoginResponse } from "@auth/models";
import { User } from "@core/models";

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: LoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: string }>()
);

export const registerSuccess = createAction(
  '[Auth/API] Register Success'
);

export const registerFailure = createAction(
  '[Auth/API] Register Failure',
  props<{ error: string }>()
);

