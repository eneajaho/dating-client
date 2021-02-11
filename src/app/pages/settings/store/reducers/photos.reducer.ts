import { Photo, Status } from '@core/models';
import { createReducer, on } from '@ngrx/store';
import {
  deletePhoto,
  deletePhotoFailure,
  deletePhotoSuccess,
  loadUserProfilePhotos,
  loadUserProfilePhotosFailure,
  loadUserProfilePhotosSuccess,
  setMainPhoto,
  setMainPhotoFailure,
  setMainPhotoSuccess,
  uploadPhoto,
  uploadPhotoFailure,
  uploadPhotoSuccess
} from '@settings/store/actions/photos.actions';

export const userPhotosFeatureKey = 'userProfilePhotos';

export interface UserPhotosState extends Status {
  photos: Photo[];

  uploading: boolean;
  uploadError?: string;
  // uploadPercent?: number;

  savingChanges: boolean;
}

export const initialState: UserPhotosState = {
  photos: [],

  uploading: false,
  uploadError: undefined,
  // TODO: add photo uploading percentage feature
  // uploadPercent: undefined,

  savingChanges: false,

  loaded: false,
  loading: false,
  error: undefined
}

export const photosReducer = createReducer(initialState,

  on(loadUserProfilePhotos, (state) => ({
    ...state, loading: true, error: undefined,
  })),

  on(loadUserProfilePhotosSuccess, (state, { photos }) => ({
    ...state, photos, loading: false, loaded: true
  })),

  on(loadUserProfilePhotosFailure, (state, { error }) => ({
    ...state, error, loading: false, loaded: false
  })),

  on(uploadPhoto, (state) => ({
    ...state, uploading: true, error: undefined
  })),

  on(uploadPhotoSuccess, (state, { photo }) => ({
    ...state, uploading: false,
    photos: [ ...state.photos, photo ]
  })),

  on(uploadPhotoFailure, (state, { error }) => ({
    ...state, uploadError: error, uploading: false
  })),

  on(setMainPhoto, (state) => ({
    ...state, savingChanges: true, error: undefined
  })),

  // photoUrl: updatedPhotos.find(p => p.id === photoId)?.url,

  on(setMainPhotoSuccess, (state, { photoId }) => {
    const updatedPhotos = state.photos.map(photo => ({
      ...photo, isMain: photo.id === photoId
    }));
    return { ...state, savingChanges: false, photos: updatedPhotos }
  }),

  on(setMainPhotoFailure, (state, { error }) => ({
    ...state, error, savingChanges: false
  })),

  on(deletePhoto, (state) => ({
    ...state, savingChanges: true, error: undefined
  })),

  on(deletePhotoSuccess, (state, { photoId }) => {
    const updatedPhotos = state.photos.filter(photo => photo.id !== photoId);
    return { ...state, photos: updatedPhotos, savingChanges: false };
  }),

  on(deletePhotoFailure, (state, { error }) => ({
    ...state, error, savingChanges: false
  }))
);

export const getUserPhotos = (s: UserPhotosState) => s.photos;

