import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, RegisterPageActions } from '@auth/store/actions';

export const registerPageFeatureKey = 'registerPage';

export interface State {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  error: null,
  loading: false,
};

export const reducer = createReducer(initialState,

  on(RegisterPageActions.register, state => ({
    ...state, error: null, loading: true
  })),

  on(AuthApiActions.registerSuccess, state => ({
    ...state, error: null, loading: false
  })),

  on(AuthApiActions.registerFailure, (state, { error }) => ({
    ...state, error, loading: false
  })),

  on(RegisterPageActions.clearRegisterError, state => ({
    ...state, error: null, loading: false
  }))
);

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
