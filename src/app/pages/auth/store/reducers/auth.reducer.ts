import { createReducer, on } from '@ngrx/store';
import { LoginResponse } from "@auth/models";
import { AuthActions, AuthApiActions } from "@auth/store/actions";

export const statusFeatureKey = 'status';

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

export const getUser = (state: State) => state.user;
