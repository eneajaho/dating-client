import { combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

import { RootState } from '@store/reducers';
import * as fromAuth from '@auth/store/reducers/auth.reducer';
import * as fromLoginPage from '@auth/store/reducers/login-page.reducer';
import * as fromRegisterPage from '@auth/store/reducers/register-page.reducer';

export const authFeatureKey = 'auth';

interface AuthStateObj {
  [fromAuth.statusFeatureKey]: fromAuth.State;
  [fromLoginPage.loginPageFeatureKey]: fromLoginPage.State;
  [fromRegisterPage.registerPageFeatureKey]: fromRegisterPage.State;
}

export interface AuthState extends RootState {
  [authFeatureKey]:  AuthStateObj
}

export const reducer = combineReducers({
  [fromAuth.statusFeatureKey]: fromAuth.reducer,
  [fromLoginPage.loginPageFeatureKey]: fromLoginPage.reducer,
  [fromRegisterPage.registerPageFeatureKey]: fromRegisterPage.reducer
});


/** Auth Selectors */
/** Auth State */
export const selectAuthState = createFeatureSelector<AuthState, AuthStateObj>(
  authFeatureKey
);



/** Auth Status */
export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state) => state[fromAuth.statusFeatureKey]
);

export const selectAuthenticatedUser = createSelector(
  selectAuthStatusState,
  fromAuth.getAuth
);

export const selectAuthToken = createSelector(
  selectAuthStatusState,
  fromAuth.getToken
);

export const selectAuthenticatedUserId = createSelector(
  selectAuthStatusState,
  fromAuth.getUserId
);

export const selectLoggedIn = createSelector(
  // selectUser, user => !!user
  selectAuthStatusState,
  fromAuth.isLoggedIn
);


/** Login Page */
export const selectLoginPageState = createSelector(
  selectAuthState,
    (state) => state[fromLoginPage.loginPageFeatureKey]
);

/** Register Page */
export const selectRegisterPageState = createSelector(
  selectAuthState,
    (state) => state[fromRegisterPage.registerPageFeatureKey]
);
