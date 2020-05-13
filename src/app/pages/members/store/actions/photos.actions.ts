import { createAction, props } from "@ngrx/store";

export const uploadPhoto = createAction(
  '[Member Photo Page] Upload Photo', props<{ payload, userId: number }>());

export const uploadPhotoSuccess = createAction(
  '[API] Upload Photo Success', props<{ photo, userId }>());

export const uploadPhotoFailure = createAction(
  '[API] Upload Photo Failure', props<{ error, userId }>());
