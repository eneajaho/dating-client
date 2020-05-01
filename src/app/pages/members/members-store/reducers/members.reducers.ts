import { Action, createReducer, on } from "@ngrx/store";
import {
  LOAD_MEMBERS,
  LOAD_MEMBERS_FAILURE,
  LOAD_MEMBERS_SUCCESS
} from "../actions";
import { initialMembersState, MembersState } from "../members-state";
import {
  LOAD_MEMBER_DETAILS,
  LOAD_MEMBER_DETAILS_FAILURE,
  LOAD_MEMBER_DETAILS_SUCCESS
} from "../actions";

const membersReducers = createReducer(initialMembersState,

  on(LOAD_MEMBERS, (state) => ({
    ...state,
    loading: true
  })),
  on(LOAD_MEMBERS_SUCCESS, (state, { members }) => ({
    ...state,
    members,
    loading: false,
    error: null
  })),
  on(LOAD_MEMBERS_FAILURE, (state, { error }) => ({
    ...state,
    members: null,
    loading: false,
    error: error
  })),

  on(LOAD_MEMBER_DETAILS, (state, { id }) => ({
    ...state,
    members: state.members?.map(member => {
      if (member.id === id) {
        return { ...member, loading: true }
      }
      return member;
    })
  })),
  on(LOAD_MEMBER_DETAILS_SUCCESS, (state, { user }) => ({
    ...state,
    members: updateObjectInArray(state.members, user, 'id')
  })),

  on(LOAD_MEMBER_DETAILS_FAILURE, (state, { error }) => ({
    ...state,
    members: state.members?.map(member => {
      if (member.id === error.userId) { member.error = error; }
      return member;
    })
  }))
);

export function reducer(state: MembersState | undefined, action: Action): MembersState {
  return membersReducers(state, action);
}


function updateObjectInArray(array: any[], object: object, key: string): any[] {
  const newArray = array.filter(item => item[key] !== object[key]);
  return [ ...newArray, object ];
}
