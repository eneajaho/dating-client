import { createReducer, on } from '@ngrx/store';
import { clearLoginError, login, loginFailure, loginSuccess } from '@auth/store/actions/auth.actions';

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

  on(login, state => ({
    ...state, error: null, loading: true
  })),

  on(loginSuccess, state => ({
    ...state, error: null, loading: false
  })),

  on(loginFailure, (state, { error }) => ({
    ...state, error, loading: false
  })),

  on(clearLoginError, state => ({
    ...state, error: null, loading: false
  })),

);

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
