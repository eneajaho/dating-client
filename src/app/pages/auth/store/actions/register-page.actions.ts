import { createAction, props } from "@ngrx/store";
import { Register } from "@auth/models";

export const register = createAction(
  '[Register Page] Register',
  props<{ credentials: Register }>()
);
