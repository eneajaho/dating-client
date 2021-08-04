import { combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

import { RootState } from '@store/reducers';

import { settingsReducer, userProfileSettingsFeatureKey, UserSettingsState } from './settings.reducer';

import { photosReducer, userPhotosFeatureKey, UserPhotosState } from './photos.reducer';

export const settingsFeatureKey = 'settings';

interface SettingsFeatureState {
  [userProfileSettingsFeatureKey]: UserSettingsState;
  [userPhotosFeatureKey]: UserPhotosState;
}

export interface SettingsState extends RootState {
  [settingsFeatureKey]: SettingsFeatureState;
}

export const reducer = combineReducers({
  [userProfileSettingsFeatureKey]: settingsReducer,
  [userPhotosFeatureKey]: photosReducer,
});

/** Settings Selectors */


/** Settings State */
export const selectSettingsState = createFeatureSelector<SettingsState, SettingsFeatureState>(
  settingsFeatureKey
);


/** User Profile Settings */

export const selectUserSettingsState = createSelector(
  selectSettingsState,
  (state) => state[userProfileSettingsFeatureKey]
);

export const selectUserProfileSettings = createSelector(
  selectUserSettingsState,
  (s) => s.user
);

export const selectUserSettingsLoading = createSelector(
  selectUserSettingsState,
  (s) => s.loading
);

export const selectUserSettingsSavingChanges = createSelector(
  selectUserSettingsState,
  (s) => s.savingChanges
);

export const selectUserSettingsLoaded = createSelector(
  selectUserSettingsState,
  (s) => s.loaded
);

export const selectUserSettingsError = createSelector(
  selectUserSettingsState,
  (s) => s.error
);


/** User Photos Selectors */

export const selectUserPhotosState = createSelector(
  selectSettingsState,
  (state) => state[userPhotosFeatureKey]
);
