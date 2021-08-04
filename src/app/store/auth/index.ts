import { createSelector } from '@ngrx/store';
import { selectAuthState } from '@store/reducers';
import * as fromAuth from './auth.reducer';

export const selectAuthUser = createSelector(selectAuthState,
  fromAuth.getUser
);

export const selectAuthToken = createSelector(selectAuthState,
  fromAuth.getToken
);

export const selectAuthUserId = createSelector(selectAuthState,
  fromAuth.getUserId
);

export const selectLoggedIn = createSelector(selectAuthState,
  fromAuth.isLoggedIn
);
