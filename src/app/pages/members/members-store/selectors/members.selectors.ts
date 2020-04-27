import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { MembersState } from "../members-state";
import { User } from "@models/User";

const getMembers = (state: MembersState): any => state.members;
const getLoading = (state: MembersState): boolean => state.loading;
const getMembersError = (state: MembersState): any => state.error;

export const selectMembersState: MemoizedSelector<object, MembersState>
  = createFeatureSelector<MembersState>('members');

export const selectMembers: MemoizedSelector<object, User[]>
  = createSelector(selectMembersState, getMembers);

export const selectMembersError: MemoizedSelector<object, any>
  = createSelector(selectMembersState, getMembersError);

export const selectMembersLoading: MemoizedSelector<object, boolean>
  = createSelector(selectMembersState, getLoading);
