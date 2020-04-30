import { createAction, props } from "@ngrx/store";
import { User } from "@models/User";

export const LOAD_MEMBER_DETAILS = createAction(
  '[Member Details Page] Load Member Details', props<{ id: number }>());

export const LOAD_MEMBER_DETAILS_SUCCESS = createAction(
  '[Member Details Page] Load Member Details Success', props<{ user: User }>());

export const LOAD_MEMBER_DETAILS_FAILURE = createAction(
  '[Member Details Page] Load Member Details Failure', props<{ error }>());
