import { createAction, props } from "@ngrx/store";
import { Credentials } from "@auth/models";

export const register = createAction(
  '[Register Page] Register',
  props<{ credentials: Credentials }>()
);
