import { createAction, props } from '@ngrx/store';
import { User } from '@core/models';

/** Load User Details */

export const loadAuthDetails = createAction(
  '[Auth Profile Page] Load Auth Details'
);

export const loadAuthDetailsSuccess = createAction(
  '[Members/API] Load Auth Details Success',
  props<{ user: User }>()
);

export const loadAuthDetailsFailure = createAction(
  '[Members/API] Load Auth Details Failure',
  props<{ error: string }>()
);


/** Edit User Details */

export const editAuthDetails = createAction(
  '[Settings Page] Edit Auth Details',
  props<{ user: User }>()
);

export const editAuthDetailsSuccess = createAction(
  '[Members/API] Edit Auth Details Success',
  props<{ user: User }>()
);

export const editAuthDetailsFailure = createAction(
  '[Members/API] Edit Auth Details Failure',
  props<{ error: string }>()
);
