import { createSelector, createFeatureSelector, Action, combineReducers } from '@ngrx/store';

import * as fromRoot from '@store/reducers';
import * as fromAuth from '@auth/store/reducers/auth.reducer';
import * as fromLoginPage from '@auth/store/reducers/login-page.reducer';
import * as fromRegisterPage from '@auth/store/reducers/register-page.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
  [fromLoginPage.loginPageFeatureKey]: fromLoginPage.State;
  [fromRegisterPage.registerPageFeatureKey]: fromRegisterPage.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
    [fromLoginPage.loginPageFeatureKey]: fromLoginPage.reducer,
    [fromRegisterPage.registerPageFeatureKey]: fromRegisterPage.reducer
  })(state, action);
}


/* Auth Selectors */

/* Auth State */
export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey
);


/* Auth Status */
export const selectAuthStatusState = createSelector(
  selectAuthState,
  state => state.status
);

export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);

export const selectUserId = createSelector(
  selectUser,
  user => user.id
);

export const selectLoggedIn = createSelector(
  selectUser,
    user => !!user
);


/* Login Page */
export const selectLoginPageState = createSelector(
  selectAuthState,
  state => state.loginPage
);

export const selectLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);


/* Register Page */
export const selectRegisterPageState = createSelector(
  selectAuthState,
  state => state.registerPage
);

export const selectRegisterPageError = createSelector(
  selectRegisterPageState,
  fromRegisterPage.getError
);

export const selectRegisterPagePending = createSelector(
  selectRegisterPageState,
  fromRegisterPage.getPending
);
