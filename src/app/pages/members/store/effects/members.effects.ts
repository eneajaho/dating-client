import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IQueryParams, MembersFilter, QueryParams } from '@core/models';
import { MemberService } from '@core/services/member.service';
import { MembersApiActions, MembersPageActions } from '@members/store/actions';
import * as fromMembers from '@members/store/reducers';
import { MembersState } from '@members/store/reducers';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';


const DEFAULT_PAGINATION_PARAMS = {
  pageNumber: '1',
  pageSize: '2'
};

@Injectable()
export class MembersEffects {
  constructor(
    private actions$: Actions, private router: Router,
    private memberService: MemberService,
    private store: Store<MembersState>
  ) { }

  FilterMembers$ = createEffect(() => this.actions$.pipe(
    ofType(MembersPageActions.setMembersFilter),
    switchMap(({ filters }) => {
      this.router.navigate(['/members/all']);
      return of(MembersPageActions.loadMembers({ filters }));
    })
  ));

  LoadMembers$ = createEffect(() => this.actions$.pipe(
    ofType(MembersPageActions.loadMembers),
    switchMap(({ filters }: { filters: Partial<IQueryParams & MembersFilter>}) => {
      const payload = { ...DEFAULT_PAGINATION_PARAMS, ...filters };
      return this.memberService.getMembers(payload).pipe(
        map(({ result, pagination }) =>
          MembersApiActions.loadMembersSuccess({ members: result, pagination })
        ),
        catchError(error => of(MembersApiActions.loadMembersFailure({ error }))),
      );
    })
  ));

  LoadMoreMembers$ = createEffect(() => {
    const currentParams$ = combineLatest([
      this.store.select(fromMembers.selectMembersPagination),
      this.store.select(fromMembers.selectMembersFilters)
    ]).pipe(
      map(([pagination, filters]) => ({
        currentFilters: filters,
        currentPagination: pagination
      }))
    );

    return this.actions$.pipe(
      ofType(MembersPageActions.loadMoreMembers),
      concatLatestFrom(() => currentParams$),
      switchMap(([action, { currentFilters, currentPagination }]) => {
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
        );
      })
    );
  });

}
