import { AuthUser } from '../../pages/auth/models/AuthUser';
import { createReducer, on } from '@ngrx/store';
import { getUserLocal, loginSuccess, logout, registerUserSuccess } from '@store/auth/auth.actions';

export const authStateKey = 'auth';

export interface AuthState {
  user: AuthUser | null;
}

export const initialState: AuthState = {
  user: null,
};

export const reducer = createReducer<AuthState>(initialState,
  on(loginSuccess, registerUserSuccess, (state, { user }) => ({ ...state, user })),

  on(logout, () => initialState),

  on(getUserLocal, (state, { user }) => ({ ...state, user })),
);

export const getUser = (state: AuthState) => state.user;
export const getToken = (state: AuthState) => state.user?.token;
export const getUserId = (state: AuthState) => state.user?.id ?? 0;
export const isLoggedIn = (state: AuthState) => state.user !== null;
