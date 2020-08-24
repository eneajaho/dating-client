import { createAction, props } from "@ngrx/store";

export const uploadPhoto = createAction(
  '[User Photo Page] Upload Photo',
  props<{ payload, userId: number }>()
);

export const uploadPhotoSuccess = createAction(
  '[API] Upload Photo Success',
  props<{ photo }>()
);

export const uploadPhotoFailure = createAction(
  '[API] Upload Photo Failure',
  props<{ error }>()
);


export const setMainPhoto = createAction(
  '[User Photos Page] Set Main Photo',
  props<{ userId, photoId }>()
);

export const setMainPhotoSuccess = createAction(
  '[API] Set Main Photo Success',
  props<{ photoId }>()
);

export const setMainPhotoFailure = createAction(
  '[API] Set Main Photo Failure',
  props<{ error }>()
);


export const deletePhoto = createAction(
  '[User Photos Page] Delete Photo',
  props<{ userId, photoId }>()
);

export const deletePhotoSuccess = createAction(
  '[API] Delete Photo Success',
  props<{ photoId }>()
);

export const deletePhotoFailure = createAction(
  '[API] Delete Photo Failure',
  props<{ error }>()
);
