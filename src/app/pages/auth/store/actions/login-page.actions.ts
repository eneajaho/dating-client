import { createAction, props } from "@ngrx/store";
import { Credentials } from "@auth/models";

export const login = createAction('[Login Page] Login Request', props<{ credentials: Credentials }>());

export const clearLoginError = createAction('[Login Page] Clear Login Error');
