import { createReducer, on } from '@ngrx/store';
import { LoginResponse } from '@auth/models';
import { AuthActions, AuthApiActions } from '@auth/store/actions';

export const statusFeatureKey = 'authStatus';

export interface State {
  user: LoginResponse | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(initialState,
  on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user })),

  on(AuthActions.logout, () => initialState),

  on(AuthActions.getUserLocal, (state, { user }) => ({ ...state, user })),
);

export const getAuth = (state: State) => state.user;
export const getToken = (state: State) => state.user?.token;
export const getUserId = (state: State) => state.user?.id;
export const isLoggedIn = (state: State) => state.user !== null;
