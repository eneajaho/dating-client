import { createReducer, on } from '@ngrx/store';
import { PhotosActions, SettingsActions } from "@settings/store/actions";
import { Status, User } from "@core/models";

export const userDetailsFeatureKey = 'userDetails';

export interface State {
  user: User;
  loading: boolean;
  loaded: boolean;
  error: string;
  savingChanges: boolean;
}

export const initialState: State & Status = {
  loading: false,
  loaded: false,
  error: null,
  savingChanges: false,
  user: null,
};

export const reducer = createReducer(initialState,

  /**  Load Auth Details Reducers  **/
  on(SettingsActions.loadAuthDetails, (state) => ({ ...state,
    loading: true, loaded: false, error: null
  })),

  on(SettingsActions.loadAuthDetailsSuccess, (state, { user }) => ({ ...state,
    user, loading: false, loaded: true, error: null
  })),

  on(SettingsActions.loadAuthDetailsFailure, (state, { error }) => ({ ...state,
    error, loading: false, loaded: true,
  })),


  /**  Edit Auth Details Reducers  **/
  on(SettingsActions.editAuthDetails, (state) => ({ ...state,
    savingChanges: true, error: null
  })),

  on(SettingsActions.editAuthDetailsSuccess, (state, { user }) => ({ ...state,
    ...user, savingChanges: false
  })),

  on(SettingsActions.editAuthDetailsFailure, (state, { error }) => ({...state,
    error, savingChanges: false
  })),


  /**  Photo Reducers  **/
  on(PhotosActions.uploadPhoto, (state) => ({ ...state,
    savingChanges: true, error: null
  })),

  on(PhotosActions.uploadPhotoSuccess, (state, { photo }) => ({ ...state,
      user: {
        ...state.user,
        photos: [ ...state.user.photos, photo ]
      },
      savingChanges: false
  })),

  on(PhotosActions.uploadPhotoFailure, (state, { error }) => ({ ...state,
    error, savingChanges: false
  })),


  on(PhotosActions.setMainPhoto, (state) => ({ ...state,
    savingChanges: true, error: null
  })),

  on(PhotosActions.setMainPhotoSuccess, (state, { photoId }) => {
    const updatedPhotos = state.user.photos.map(photo => ({ ...photo, isMain: photo.id === photoId }));
    return { ...state,
      user: {
        ...state.user,
        photoUrl: updatedPhotos.find(p => p.id === photoId).url,
        photos: updatedPhotos
      },
      savingChanges: false
    }
  }),

  on(PhotosActions.setMainPhotoFailure, (state, { error }) => ({ ...state,
    error, savingChanges: false
  })),


  on(PhotosActions.deletePhoto, (state) => ({ ...state,
    savingChanges: true, error: null
  })),

  on(PhotosActions.deletePhotoSuccess, (state, { photoId }) => {
    const updatedPhotos = state.user.photos.filter(photo => photo.id !== photoId);
    return {  ...state, user: { ...state.user, photos: updatedPhotos }, savingChanges: false };
  }),

  on(PhotosActions.deletePhotoFailure, (state, { error }) => ({ ...state,
    error, savingChanges: false
  })),

);


export const getUserDetails = (state: State) => state.user;

export const getUserDetailsLoading = (state: State) => state.loading;

export const getUserDetailsLoaded = (state: State) => state.loaded;

export const getUserDetailsError = (state: State) => state.error;

export const getUserDetailsSavingChanges = (state: State) => state.savingChanges;
