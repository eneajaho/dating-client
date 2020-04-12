import { createSelector, MemoizedSelector } from '@ngrx/store';

import { AuthSelectors } from "../auth/auth-store";

export const selectError: MemoizedSelector<object, string> = createSelector(
  AuthSelectors.selectAuthError,
  (authError: string) => {  return authError; });

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  AuthSelectors.selectAuthLoading,
  (authLoading: boolean) => { return authLoading ; });
