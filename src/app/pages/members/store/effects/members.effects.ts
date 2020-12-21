import { Injectable } from "@angular/core";
import { catchError, concatMap, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { combineLatest, of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { MembersApiActions, MembersPageActions } from "@members/store/actions";
import { MemberService } from "@core/services";
import * as fromMembers from '@members/store/reducers';
import { IQueryParams, MembersFilter, QueryParams } from "@core/models";
import { Router } from "@angular/router";

const DEFAULT_PAGINATION_PARAMS = {
  pageNumber: '1',
  pageSize: '2'
};

@Injectable()
export class MembersEffects {
  constructor(private actions$: Actions, private router: Router,
              private memberService: MemberService,
              private store: Store<fromMembers.State>) { }

  FilterMembers$ = createEffect(() => this.actions$.pipe(
    ofType(MembersPageActions.setMembersFilter),
    tap(() => this.router.navigate([ '/members/all' ])),
    switchMap(({ filters }) => of(MembersPageActions.loadMembers(filters))),
  ));

  LoadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersPageActions.loadMembers),
      switchMap((params: Partial<IQueryParams & MembersFilter>) => {
        const payload = { ...DEFAULT_PAGINATION_PARAMS, ...params };
        return this.memberService.getMembers(payload).pipe(
          map(({ result, pagination }) =>
            MembersApiActions.loadMembersSuccess({ members: result, pagination })
          ),
          catchError(error => of(MembersApiActions.loadMembersFailure({ error }))),
        )
      })
    ));

  LoadMoreMembers$ = createEffect(() => {
    const currentParams$ = combineLatest([
      this.store.select(fromMembers.selectMembersPagination),
      this.store.select(fromMembers.selectMembersFilters)
    ]).pipe(
      map(([ pagination, filters ]) => ({
        currentFilters: filters,
        currentPagination: pagination
      }))
    );

    return this.actions$.pipe(
      ofType(MembersPageActions.loadMoreMembers),
      concatMap(action => of(action).pipe(withLatestFrom(currentParams$))),
      switchMap(([ action, { currentFilters, currentPagination } ]) => {
        const newPaginationParams = new QueryParams(
          (currentPagination.currentPage + 1).toString(),
          currentPagination.itemsPerPage.toString()
        );
        const params = { ...newPaginationParams, ...currentFilters };

        return this.memberService.getMembers(params).pipe(
          map(({ result, pagination }) =>
            MembersApiActions.loadMoreMembersSuccess({ members: result, pagination })
          ),
          catchError(error => of(MembersApiActions.loadMoreMembersFailure({ error }))),
        )
      })
    )
  });

}
