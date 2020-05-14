import { createAction, props } from "@ngrx/store";

export const uploadPhoto = createAction(
  '[Member Photo Page] Upload Photo', props<{ payload, userId: number }>());

export const uploadPhotoSuccess = createAction(
  '[API] Upload Photo Success', props<{ photo, userId }>());

export const uploadPhotoFailure = createAction(
  '[API] Upload Photo Failure', props<{ error, userId }>());


export const setMainPhoto = createAction(
  '[Members Photos Page] Set Main Photo', props<{ userId, photoId }>());

export const setMainPhotoSuccess = createAction(
  '[API] Set Main Photo Success', props<{ userId, photoId }>());

export const setMainPhotoFailure = createAction(
  '[API] Set Main Photo Failure', props<{ userId, error }>());


export const deletePhoto = createAction(
  '[Members Photos Page] Delete Photo', props<{ userId, photoId }>());

export const deletePhotoSuccess = createAction(
  '[Members Photos Page] Delete Photo Success', props<{ userId, photoId }>());

export const deletePhotoFailure = createAction(
  '[Members Photos Page] Delete Photo Failure', props<{ userId, error }>());
