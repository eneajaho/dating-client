import { Action, createReducer, on } from "@ngrx/store";
import { LOAD_MEMBERS, LOAD_MEMBERS_FAILURE, LOAD_MEMBERS_SUCCESS } from "../actions/members.actions";
import { initialMembersState, MembersState } from "../members-state";

const membersReducers = createReducer(initialMembersState,
  on(LOAD_MEMBERS,
    (state) => ({ ...state, loading: true })),
  on(LOAD_MEMBERS_SUCCESS,
    (state, { members }) => ({ ...state, members, loading: false, error: null })),
  on(LOAD_MEMBERS_FAILURE,
    (state, { error }) => ({ ...state, members: null, loading: false, error: error })),

);

export function reducer(state: MembersState | undefined, action: Action): MembersState {
  return membersReducers(state, action);
}
