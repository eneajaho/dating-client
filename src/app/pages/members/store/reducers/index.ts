import { Action, combineReducers, createFeatureSelector, createSelector, } from '@ngrx/store';
import * as fromMembers from '@members/store/reducers/members.reducers';
import * as fromAuth from '@auth/store/reducers';
import * as fromRoot from '@store/reducers';
import { selectUserId } from "@auth/store/reducers";

export const membersFeatureKey = 'members';

export interface MembersState {
  [fromMembers.membersFeatureKey]: fromMembers.State;
}

export interface State extends fromRoot.State, fromAuth.State {
  [membersFeatureKey]: MembersState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: MembersState | undefined, action: Action) {
  return combineReducers({
    [fromMembers.membersFeatureKey]: fromMembers.reducer
  })(state, action);
}

export const selectMembersState = createFeatureSelector<State, MembersState>(
  membersFeatureKey
);

export const selectMemberEntitiesState = createSelector(
  selectMembersState,
  state => state[membersFeatureKey]
);

export const {
  selectIds: selectMemberIds,
  selectEntities: selectMemberEntities,
  selectAll: selectAllMembers,
  selectTotal: selectTotalMembers,
} = fromMembers.adapter.getSelectors(selectMemberEntitiesState);

/* Member Entities selectors */

export const selectMembersLoading = createSelector(
  selectMemberEntitiesState,
  members => members.loading
);

export const selectMembersLoaded = createSelector(
  selectMemberEntitiesState,
  members => members.loaded
);

export const selectMembersError = createSelector(
  selectMemberEntitiesState,
  members => members.error
);

/* Selected Member Selectors */

export const selectSelectedMemberId = createSelector(
  selectMemberEntitiesState,
  fromMembers.getMemberId
);

export const selectSelectedMember = createSelector(
  selectMemberEntities,
  selectSelectedMemberId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const selectMemberLoading = createSelector(
  selectSelectedMember,
  member => member.loading
);

export const selectMemberLoaded = createSelector(
  selectSelectedMember,
  member => member.loaded
);

export const selectMemberError = createSelector(
  selectSelectedMember,
  member => member.error
);

export const selectMyProfile = createSelector(
  selectMemberEntitiesState,
  selectUserId,
  (members, userId) => members[userId]
);



