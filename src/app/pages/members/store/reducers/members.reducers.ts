import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from "@ngrx/store";

import { MemberActions, MemberEditPageActions, MembersApiActions, MembersPageActions } from "@members/store/actions";
import { User } from "@core/models";


export const membersFeatureKey = 'members';

export interface Status {
  error?: string;
  loaded?: boolean;
  loading?: boolean;
}

export interface State extends EntityState<User & Status>, Status {
  selectedMemberId: number;
}

export const adapter: EntityAdapter<User & Status> = createEntityAdapter<User & Status>({
  selectId: (user: User) => user.id
});

export const initialState: State = adapter.getInitialState({
  selectedMemberId: null,
  error: null,
  loaded: false,
  loading: false
});


export const reducer = createReducer(initialState,

  /** All Members reducers **/

  on(MembersPageActions.loadMembers, state => ({
    ...state, error: null, loaded: false, loading: true
  })),

  on(MembersApiActions.loadMembersSuccess, (state, { members }) => {
    return adapter.addMany(members, {
      ...state, error: null, loaded: true, loading: false
    })
  }),

  on(MembersApiActions.loadMembersFailure, (state, { error }) => ({
    ...state, error,
  })),


  /** Selected Member reducers **/

  on(MemberActions.loadMember, (state, { id }) => ({
    ...state, selectedMemberId: id
  })),

  on(MemberActions.loadMember, (state, { id }) => {
    return adapter.updateOne({ id: id, changes: { loading: true, error: null } }, state);
  }),

  on(MembersApiActions.loadMemberSuccess, (state, { user }) => {
    return adapter.updateOne({
      id: user.id,
      changes: { ...user, loading: false, loaded: true, error: null }
    }, state);
  }),

  on(MembersApiActions.loadMemberFailure, (state, { error, id }) => {
    return adapter.updateOne({
      id: id, changes: { error: error, loaded: false, loading: false }
    }, state);
  }),


  /**  Edit Member Reducers  **/

  on(MemberEditPageActions.editMember, (state, { user }) => {
    return adapter.updateOne({
      id: user.id,
      changes: { loading: true, error: null }
    }, state);
  }),

  on(MembersApiActions.editMemberSuccess, (state, { user }) => {
    return adapter.updateOne({
      id: user.id,
      changes: { ...user, loading: false, loaded: true, error: null }
    }, state);
  }),

  on(MembersApiActions.editMemberFailure, (state, { error, id }) => {
    return adapter.updateOne({
      id: id, changes: { error: error, loaded: false, loading: false }
    }, state);
  }),
)


export const getMemberId = (state: State) => state.selectedMemberId;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;





