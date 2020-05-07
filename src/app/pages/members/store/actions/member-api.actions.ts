import { createAction, props } from "@ngrx/store";
import { User } from "@core/models";

export const loadMembersSuccess = createAction(
  '[Members API] Load Members Success', props<{ members: User[] }>());

export const loadMembersFailure = createAction(
  '[Members API] Load Members Failure', props<{ error }>());

