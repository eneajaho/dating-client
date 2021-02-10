import { combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

import { RootState } from '@store/reducers';
import * as fromSettings from './settings.reducer';

export const settingsFeatureKey = 'settings';

interface SettingsStateObj {
  [fromSettings.userDetailsFeatureKey]: fromSettings.State;
}

export interface SettingsState extends RootState {
  [settingsFeatureKey]: SettingsStateObj;
}

export const reducer = combineReducers({
  [fromSettings.userDetailsFeatureKey]: fromSettings.reducer,
});

/** Settings Selectors */


/** Settings State */
export const selectSettingsState = createFeatureSelector<SettingsState, SettingsStateObj>(
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


