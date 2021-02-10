import { createReducer, on } from '@ngrx/store';
import { Status, User } from '@core/models';
import {
  editAuthDetails, editAuthDetailsFailure, editAuthDetailsSuccess,
  loadAuthDetails,
  loadAuthDetailsFailure,
  loadAuthDetailsSuccess
} from '@settings/store/actions/settings.actions';
import {
  deletePhoto,
  deletePhotoFailure, deletePhotoSuccess,
  setMainPhoto,
  setMainPhotoFailure,
  setMainPhotoSuccess,
  uploadPhoto, uploadPhotoFailure, uploadPhotoSuccess
} from '@settings/store/actions/photos.actions';

export const userDetailsFeatureKey = 'userDetails';

export interface State {
  user: User & Status;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  savingChanges: boolean;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  error: null,
  savingChanges: false,
  user: {
    photos: [],
    id: -1,
    loading: false,
    loaded: false,
    error: undefined
  },
};

export const reducer = createReducer(initialState,

  /**  Load Auth Details Reducers  **/
  on(loadAuthDetails, (state) => ({ ...state,
    loading: true, loaded: false, error: null
  })),

  on(loadAuthDetailsSuccess, (state, { user }) => ({ ...state,
    user: { ...user, loading: false, loaded: true, error: undefined },
    loading: false, loaded: true, error: null
  })),

  on(loadAuthDetailsFailure, (state, { error }) => ({ ...state,
    error, loading: false, loaded: true,
  })),


  /**  Edit Auth Details Reducers  **/
  on(editAuthDetails, (state) => ({ ...state,
    savingChanges: true, error: null
  })),

  on(editAuthDetailsSuccess, (state, { user }) => ({ ...state,
    ...user, savingChanges: false
  })),

  on(editAuthDetailsFailure, (state, { error }) => ({...state,
    error, savingChanges: false
  })),


  /**  Photo Reducers  **/
  on(uploadPhoto, (state) => ({ ...state,
    savingChanges: true, error: null
  })),

  on(uploadPhotoSuccess, (state, { photo }) => {
    const updatedPhotos = [ ...state.user.photos, photo ];
    return { ...state,
      user: { ...state.user, photos: updatedPhotos },
      savingChanges: false
    };
  }),

  on(uploadPhotoFailure, (state, { error }) => ({ ...state,
    error, savingChanges: false
  })),


  on(setMainPhoto, (state) => ({ ...state,
    savingChanges: true, error: null
  })),

  on(setMainPhotoSuccess, (state, { photoId }) => {
    const updatedPhotos = state.user.photos.map(photo => ({ ...photo, isMain: photo.id === photoId }));
    return { ...state, savingChanges: false,
      user: {
        ...state.user,
        photoUrl: updatedPhotos.find(p => p.id === photoId)?.url,
        photos: updatedPhotos
      }
    };
  }),

  on(setMainPhotoFailure, (state, { error }) => ({ ...state,
    error, savingChanges: false
  })),


  on(deletePhoto, (state) => ({ ...state,
    savingChanges: true, error: null
  })),

  on(deletePhotoSuccess, (state, { photoId }) => {
    const updatedPhotos = state.user.photos.filter(photo => photo.id !== photoId);
    return {  ...state, user: { ...state.user, photos: updatedPhotos }, savingChanges: false };
  }),

  on(deletePhotoFailure, (state, { error }) => ({ ...state,
    error, savingChanges: false
  })),

);


export const getUserDetails = (state: State) => state.user;
export const getUserDetailsLoading = (state: State) => state.loading;
export const getUserDetailsLoaded = (state: State) => state.loaded;
export const getUserDetailsError = (state: State) => state.error;
export const getUserDetailsSavingChanges = (state: State) => state.savingChanges;
