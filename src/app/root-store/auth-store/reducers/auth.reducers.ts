import { Action, createReducer, on } from '@ngrx/store';
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/auth.actions';
import { AuthState, initialState } from "../auth-state";

const authReducers = createReducer(initialState,
  // login reducers
  on(LOGIN_REQUEST,
    (state) => ({ ...state, loading: true })),
  on(LOGIN_SUCCESS,
    (state, { user }) => ({ ...state, user, loading: false, loginError: null })),
  on(LOGIN_FAILURE,
    (state, { error }) => ({ ...state, user: null, loading: false, loginError: error })),

  // register reducers
  on(REGISTER_REQUEST,
    (state) => ({ ...state, loading: true })),
  on(REGISTER_SUCCESS,
    (state, { user }) => ({ ...state, user, loading: false, registerError: null })),
  on(REGISTER_FAILURE,
    (state, { error }) => ({ ...state, user: null, loading: false, registerError: error })),

  // logout reducer
  on(LOGOUT, (state) => ({ ...state, user: null }))
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducers(state, action);
}
