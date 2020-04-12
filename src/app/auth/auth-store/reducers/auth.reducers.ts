import { Action, createReducer, on } from '@ngrx/store';
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST, LOGOUT } from '../actions/login.actions';
import { State, initialState } from "../auth-state";

const authReducers = createReducer(initialState,
  // login reducers
  on(LOGIN_REQUEST,
    (state) => ({ ...state, loading: true })),
  on(LOGIN_SUCCESS,
    (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(LOGIN_FAILURE,
    (state, { error }) => ({ ...state, user: null, loading: false, error })),

  // register reducers


  // logout reducer
  on(LOGOUT, (state) => ({ ...state, user: null }))
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducers(state, action);
}
