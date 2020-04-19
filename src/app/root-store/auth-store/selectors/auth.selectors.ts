import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { State } from "../auth-state";
import { User } from "../../../auth/models/User.model";

const getUser = (state: State): any => state.user;
const getIsLoading = (state: State): boolean => state.loading;
const getError = (state: State): any => state.error;

export const selectAuthState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('auth');

export const selectAuthUser: MemoizedSelector<object, User>
  = createSelector(selectAuthState, getUser);

export const selectAuthLoading: MemoizedSelector<object, boolean>
  = createSelector(selectAuthState, getIsLoading);

export const selectAuthError: MemoizedSelector<object, any>
  = createSelector(selectAuthState, getError);

export const selectIsAuthenticated: MemoizedSelector<object, any>
  = createSelector(selectAuthUser, user => !!user);
