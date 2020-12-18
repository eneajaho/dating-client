import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, LoginPageActions } from "@auth/store/actions";

export const loginPageFeatureKey = 'loginPage';

export interface State {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  error: null,
  loading: false,
};

export const reducer = createReducer(initialState,

  on(LoginPageActions.login, state => ({
    ...state, error: null, loading: true
  })),

  on(AuthApiActions.loginSuccess, state => ({
    ...state, error: null, loading: false
  })),

  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state, error, loading: false
  })),

  on(LoginPageActions.clearLoginError, state => ({
    ...state, error: null, loading: false
  })),

);

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
