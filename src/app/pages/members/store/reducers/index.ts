import { Action, combineReducers, createFeatureSelector, createSelector, } from '@ngrx/store';
import * as fromMembers from '@members/store/reducers/members.reducers';
import * as fromAuth from '@auth/store/reducers';
import * as fromRoot from '@store/reducers';
import { adapter } from "@members/store/reducers/members.reducers";

export const membersFeatureKey = 'members';

export interface MembersState {
  [fromMembers.membersEntityFeatureKey]: fromMembers.State;
}

export interface State extends fromRoot.State, fromAuth.State {
  [membersFeatureKey]: MembersState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: MembersState | undefined, action: Action) {
  return combineReducers({
    [fromMembers.membersEntityFeatureKey]: fromMembers.reducer
  })(state, action);
}


export const selectMembersState = createFeatureSelector<State, MembersState>(
  membersFeatureKey
);

export const selectMemberEntitiesState = createSelector(
  selectMembersState,
  state => state[fromMembers.membersEntityFeatureKey]
);

export const {
  selectIds: selectMemberIds,
  selectEntities: selectMemberEntities,
  selectAll: selectAllMembers,
  selectTotal: selectTotalMembers,
} = adapter.getSelectors(selectMemberEntitiesState);


/* Member Entities selectors */
export const selectMembersLoading = createSelector(
  selectMemberEntitiesState,
  fromMembers.getLoading
);

export const selectMembersLoaded = createSelector(
  selectMemberEntitiesState,
  fromMembers.getLoaded
);

export const selectMembersError = createSelector(
  selectMemberEntitiesState,
  fromMembers.getError
);

/** Pagination */
export const selectMembersPagination = createSelector(
  selectMemberEntitiesState,
  fromMembers.getPagination
);

export const selectMembersPaginationLoading = createSelector(
  selectMembersPagination,
  (state) => state?.loading
);

export const selectMembersHasMorePages = createSelector(
  selectMembersPagination,
  (state) => state.currentPage < state.totalPages
);

export const selectMembersPaginationError = createSelector(
  selectMembersPagination,
  (state) => state?.error
);

/** Members Filters */
export const selectMembersFilters = createSelector(
  selectMemberEntitiesState,
  fromMembers.getFilters
);



/** Selected Member Selectors */
export const selectSelectedMemberId = createSelector(
  selectMemberEntitiesState,
  fromMembers.getMemberId
);

export const selectSelectedMember = createSelector(
  selectMemberEntities,
  selectSelectedMemberId,
  (members, selectedMemberId) => {
    return members[selectedMemberId]
  }
);

export const selectMemberLoading = createSelector(
  selectSelectedMember,
  member => member?.loading
);

export const selectMemberLoaded = createSelector(
  selectSelectedMember,
  member => member?.loaded
);

export const selectMemberError = createSelector(
  selectSelectedMember,
  member => member?.error
);

export const selectIsMyProfile = createSelector(
  selectSelectedMemberId,
  fromAuth.selectUserId,
  (selectedMemberId, authUserId) => {
    return selectedMemberId === authUserId;
  }
);




