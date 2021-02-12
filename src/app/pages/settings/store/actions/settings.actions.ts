import { createAction, props } from '@ngrx/store';
import { User } from '@core/models';

/** Load User Profile Settings */

export const loadUserSettings = createAction(
  '[User Settings Page] Load User Profile Settings'
);

export const loadUserSettingsSuccess = createAction(
  '[Members/API] Load User Settings Success',
  props<{ user: User }>()
);

export const loadUserSettingsFailure = createAction(
  '[Members/API] Load User Settings Failure',
  props<{ error: string }>()
);


/** Edit User Profile Settings */

export const editUserSettings = createAction(
  '[Settings Page] Edit User Profile Settings',
  props<{ userData: Partial<User> }>()
);

export const editUserSettingsSuccess = createAction(
  '[Members/API] Edit User Profile Settings Success',
  props<{ user: User }>()
);

export const editUserSettingsFailure = createAction(
  '[Members/API] Edit User Profile Settings Failure',
  props<{ error: string }>()
);


/** Will be dispatched when main user image changes */
export const changeUserImageLocally = createAction(
  '[Set Main Photo Action] Change User Image Locally',
  props<{ photoUrl: string }>()
);
