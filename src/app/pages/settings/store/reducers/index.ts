import { combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

import { RootState } from '@store/reducers';
import * as fromSettings from './settings.reducer';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  [fromSettings.userDetailsFeatureKey]: fromSettings.State;
}

export interface State extends RootState {
  [settingsFeatureKey]: SettingsState;
}

export const reducer = combineReducers({
  [fromSettings.userDetailsFeatureKey]: fromSettings.reducer,
});

/** Settings Selectors */


/** Settings State */
export const selectSettingsState = createFeatureSelector<State, SettingsState>(
  settingsFeatureKey
);


/** Auth User Details */

export const selectUserDetailsState = createSelector(
  selectSettingsState,
  (state) => state[fromSettings.userDetailsFeatureKey]
);


export const selectUserDetails = createSelector(
  selectUserDetailsState,
  fromSettings.getUserDetails
);

export const selectUserDetailsLoading = createSelector(
  selectUserDetailsState,
  fromSettings.getUserDetailsLoading
);

export const selectUserDetailsSavingChanges = createSelector(
  selectUserDetailsState,
  fromSettings.getUserDetailsSavingChanges
);

export const selectUserDetailsLoaded = createSelector(
  selectUserDetailsState,
  fromSettings.getUserDetailsLoaded
);

export const selectUserDetailsError = createSelector(
  selectUserDetailsState,
  fromSettings.getUserDetailsError
);


