import { createAction, props } from "@ngrx/store";
import { IQueryParams, MembersFilter } from "@core/models";

export const setMembersFilter = createAction(
  '[Members Search Page] Set Members Filter',
  props<{ filters: MembersFilter }>()
)

export const loadMembers = createAction(
  '[Members Page] Load Members',
  props<IQueryParams & MembersFilter>()
);

export const loadMoreMembers = createAction(
  '[Members Page] Load More Members',
  // props<IQueryParams>()
);
