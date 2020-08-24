import { createAction, props } from "@ngrx/store";
import { IQueryParams } from "@core/models";

export const loadMembers = createAction(
  '[Members Page] Load Members',
  props<IQueryParams>()
);

export const loadMoreMembers = createAction(
  '[Members Page] Load More Members',
  // props<IQueryParams>()
);
