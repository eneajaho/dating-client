import { createAction, props } from "@ngrx/store";
import { IQueryParams, Pagination, User } from "@core/models";

export const loadMembersSuccess = createAction(
  '[Members/API] Load Members Success',
  props<{ members: User[], pagination: Pagination }>()
);

export const loadMembersFailure = createAction(
  '[Members/API] Load Members Failure',
  props<{ error }>()
);

export const loadMoreMembersSuccess = createAction(
  '[Members/API] Load More Members Success',
  props<{ members: User[], pagination: Pagination }>()
);

export const loadMoreMembersFailure = createAction(
  '[Members/API] Load More Members Failure',
  props<{ error }>()
);


export const loadMemberSuccess = createAction(
  '[Members/API] Load Member Success',
  props<{ user: User }>()
);

export const loadMemberFailure = createAction(
  '[Members/API] Load Member Failure',
  props<{ error, id }>()
);
