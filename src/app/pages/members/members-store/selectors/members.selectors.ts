import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import * as fromRouter from '@root-store/router-store/custom-serializer';
import { MembersState } from "../members-state";
import { User } from "@models/User";


const getMembers = (state: MembersState): any => state.members;
const getLoading = (state: MembersState): boolean => state.loading;
const getMembersError = (state: MembersState): any => state.error;

const getSelectedMember = (state: MembersState, id: string): User => {
  return state.members.find(user => user.id === +id);
}

export const selectMembersState: MemoizedSelector<object, MembersState>
  = createFeatureSelector<MembersState>('members');

export const selectSelectedMemberId = createSelector(
  fromRouter.selectRouter,
  (router) => router.state && router.state.params.memberId
);

export const selectMembers: MemoizedSelector<object, User[]>
  = createSelector(selectMembersState, getMembers);

export const selectSelectedMember = createSelector(
  selectMembersState,
  selectSelectedMemberId,
  getSelectedMember
);


export const selectMembersError: MemoizedSelector<object, any>
  = createSelector(selectMembersState, getMembersError);

export const selectMembersLoading: MemoizedSelector<object, boolean>
  = createSelector(selectMembersState, getLoading);
