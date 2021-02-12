import { createReducer, on } from '@ngrx/store';
import { Status, User } from '@core/models';
import {
  changeUserImageLocally,
  editUserSettings,
  editUserSettingsFailure,
  editUserSettingsSuccess,
  loadUserSettings,
  loadUserSettingsFailure,
  loadUserSettingsSuccess
} from '@settings/store/actions/settings.actions';

export const userProfileSettingsFeatureKey = 'userProfileSettings';

export interface UserSettingsState extends Status {
  user: User;
  loading: boolean;
  loaded: boolean;
  error: string | undefined;
  savingChanges: boolean;
}

export const initialState: UserSettingsState = {
  loading: false,
  loaded: false,
  error: undefined,
  savingChanges: false,
  user: {
    id: 0
  },
};

export const settingsReducer = createReducer(initialState,

  /**  Load User Profile Settings Reducers  **/
  on(loadUserSettings, (state) => ({
    ...state, loading: true, loaded: false, error: undefined
  })),

  on(loadUserSettingsSuccess, (state, { user }) => ({ ...state,
    user: { ...user, loading: false, loaded: true, error: undefined },
    loading: false, loaded: true, error: undefined
  })),

  on(loadUserSettingsFailure, (state, { error }) => ({
    ...state, error, loading: false, loaded: true,
  })),


  /**  Edit User Profile Settings Reducers  **/
  on(editUserSettings, (state) => ({ ...state,
    savingChanges: true, error: undefined
  })),

  on(editUserSettingsSuccess, (state, { user }) => ({
    ...state, user, savingChanges: false
  })),

  on(editUserSettingsFailure, (state, { error }) => ({
    ...state, error, savingChanges: false
  })),

  on(changeUserImageLocally, (state, { photoUrl }) => ({
    ...state, user: { ...state.user, photoUrl }
  }))

);
