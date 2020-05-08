import { createAction, props } from "@ngrx/store";

export const loadMember = createAction(
  '[Member Details Page] Load Member', props<{ id: number }>());

