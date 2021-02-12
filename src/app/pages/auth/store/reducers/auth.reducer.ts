import { createReducer, on } from '@ngrx/store';
import { LoginResponse } from '@auth/models';
import { getUserLocal, loginSuccess, logout } from '@auth/store/actions/auth.actions';

export const statusFeatureKey = 'authStatus';

export interface State {
  user: LoginResponse | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(initialState,
  on(loginSuccess, (state, { user }) => ({ ...state, user })),

  on(logout, () => initialState),

  on(getUserLocal, (state, { user }) => ({ ...state, user })),
);

export const getAuth = (state: State) => state.user;
export const getToken = (state: State) => state.user?.token;
export const getUserId = (state: State) => state.user?.id ?? 0;
export const isLoggedIn = (state: State) => state.user !== null;
