import { createReducer, on } from '@ngrx/store';
import { clearRegisterError, register, registerFailure, registerSuccess } from '@auth/store/actions/auth.actions';

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

  on(register, state => ({
    ...state, error: null, loading: true
  })),

  on(registerSuccess, state => ({
    ...state, error: null, loading: false
  })),

  on(registerFailure, (state, { error }) => ({
    ...state, error, loading: false
  })),

  on(clearRegisterError, state => ({
    ...state, error: null, loading: false
  }))
);

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
