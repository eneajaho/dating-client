import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { AuthState } from "../auth-state";
import { User } from "@models/User";
import { LoginResponse } from "@pages/auth/models/LoginResponse";

const getUser = (state: AuthState): any => state.user;
const getIsLoading = (state: AuthState): boolean => state.loading;
const getLoginError = (state: AuthState): any => state.loginError;
const getRegisterError = (state: AuthState): any => state.registerError;

export const selectAuthState: MemoizedSelector<object, AuthState>
  = createFeatureSelector<AuthState>('auth');

export const selectAuthUser: MemoizedSelector<object, any | User | LoginResponse>
  = createSelector(selectAuthState, getUser);

export const selectAuthLoading: MemoizedSelector<object, boolean>
  = createSelector(selectAuthState, getIsLoading);

export const selectAuthLoginError: MemoizedSelector<object, any>
  = createSelector(selectAuthState, getLoginError);

export const selectAuthRegisterError: MemoizedSelector<object, any>
  = createSelector(selectAuthState, getRegisterError);

export const selectIsAuthenticated: MemoizedSelector<object, any>
  = createSelector(selectAuthUser, user => !!user);
