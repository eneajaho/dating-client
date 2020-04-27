import { createAction, props } from "@ngrx/store";
import { User } from "@models/User";

export const LOAD_MEMBERS = createAction(
  '[Members Page] Load Members');

export const LOAD_MEMBERS_SUCCESS = createAction(
  '[Members Page] Load Members Success', props<{ members: User[] }>());

export const LOAD_MEMBERS_FAILURE = createAction(
  '[Members Page] Load Members Failure', props<{ error }>());
