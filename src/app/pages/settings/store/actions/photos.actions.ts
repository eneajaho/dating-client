import { createAction, props } from '@ngrx/store';
import { Photo } from '@core/models';

interface PhotoUploadPayload {
  payload: FormData;
}

export const loadUserProfilePhotos = createAction(
  '[User Profile Photos Page] Load User Profile Photos',
  props<{ userId: number }>()
);

export const loadUserProfilePhotosSuccess = createAction(
  '[API] Load User Profile Photos Success',
  props<{ photos: Photo[] }>()
);

export const loadUserProfilePhotosFailure = createAction(
  '[API] Load User Profile Photos Failure',
  props<{ error: string}>()
);

export const uploadPhoto = createAction(
  '[User Profile Photos Page] Upload Photo',
  props<{ payload: FormData }>()
);

export const uploadPhotoSuccess = createAction(
  '[API] Upload Photo Success',
  props<{ photo: Photo }>()
);

export const uploadPhotoFailure = createAction(
  '[API] Upload Photo Failure',
  props<{ error: string}>()
);


export const setMainPhoto = createAction(
  '[User Photos Page] Set Main Photo',
  props<{ photoId: number }>()
);

export const setMainPhotoSuccess = createAction(
  '[API] Set Main Photo Success',
  props<{ photoId: number }>()
);

export const setMainPhotoFailure = createAction(
  '[API] Set Main Photo Failure',
  props<{ error: string }>()
);


export const deletePhoto = createAction(
  '[User Photos Page] Delete Photo',
  props<{ photoId: number }>()
);

export const deletePhotoSuccess = createAction(
  '[API] Delete Photo Success',
  props<{ photoId: number }>()
);

export const deletePhotoFailure = createAction(
  '[API] Delete Photo Failure',
  props<{ error: string }>()
);
