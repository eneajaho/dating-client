import { RootState } from '@store/reducers';
import { combineReducers, createFeatureSelector, createSelector, } from '@ngrx/store';
import * as fromMembers from '@members/store/reducers/members.reducers';
import { adapter } from '@members/store/reducers/members.reducers';
import { selectAuthUserId } from '@store/auth';

export const membersFeatureKey = 'members';

interface MembersFeatureState {
  [fromMembers.membersEntityFeatureKey]: fromMembers.State;
}

// State will extend only AuthState which is also extending RootState,
// so there is no need to extend RootState
export interface MembersState extends RootState {
  [membersFeatureKey]: MembersFeatureState;
}

export const reducer = combineReducers({
  [fromMembers.membersEntityFeatureKey]: fromMembers.reducer
});


export const selectMembersState = createFeatureSelector<MembersState, MembersFeatureState>(
  membersFeatureKey
);

export const selectMemberEntitiesState = createSelector(
  selectMembersState,
  state => state[fromMembers.membersEntityFeatureKey]
);

export const {
  // selectIds: selectMemberIds,
  selectEntities: selectMemberEntities,
  selectAll: selectAllMembers,
  // selectTotal: selectTotalMembers,
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

export const selectMembersHasMorePages = createSelector(
  selectMembersPagination,
  (state) => state.currentPage < state.totalPages
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
    return members[selectedMemberId];
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

export const selectIsMyProfile = (userId: number) => createSelector(
  selectAuthUserId,
  (authUserId: number | undefined) => {
    return authUserId === userId;
  }
);




