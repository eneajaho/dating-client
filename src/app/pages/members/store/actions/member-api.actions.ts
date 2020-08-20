import { createAction, props } from "@ngrx/store";
import { User } from "@core/models";

export const loadMembersSuccess = createAction(
  '[Members/API] Load Members Success', props<{ members: User[] }>());

export const loadMembersFailure = createAction(
  '[Members/API] Load Members Failure', props<{ error }>());


export const loadMemberSuccess = createAction(
  '[Members/API] Load Member Success', props<{ user: User }>());

export const loadMemberFailure = createAction(
  '[Members/API] Load Member Failure', props<{ error, id }>());



export const editMemberSuccess = createAction(
  '[Member Edit Page] Edit Member Success', props<{ user: User }>());

export const editMemberFailure = createAction(
  '[Member Edit Page] Member Edit Failure', props<{ error, id }>());
