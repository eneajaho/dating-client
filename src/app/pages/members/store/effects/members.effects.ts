import { Injectable } from "@angular/core";
import { catchError, concatMap, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { MembersApiActions, MembersPageActions } from "@members/store/actions";
import { MemberService } from "@core/services";
import * as fromMembers from '@members/store/reducers';
import { QueryParams } from "@core/models";

@Injectable()
export class MembersEffects {
  constructor(private actions$: Actions, private memberService: MemberService,
              private store: Store<fromMembers.State>) {}

  LoadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersPageActions.loadMembers),
      switchMap(({ pageNumber, pageSize }) => {
        return this.memberService.getMembers({ pageNumber, pageSize }).pipe(
          map(({ result, pagination }) =>
            MembersApiActions.loadMembersSuccess({ members: result, pagination })
          ),
          catchError(error => of(MembersApiActions.loadMembersFailure({ error }))),
        )
      })
    ));

  LoadMoreMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersPageActions.loadMoreMembers),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(fromMembers.selectMembersPagination))
      )),
      switchMap(([action, activePagination]) => {
        const params = new QueryParams(
          (activePagination.currentPage + 1).toString(),
          activePagination.itemsPerPage.toString()
        );

        return this.memberService.getMembers(params).pipe(
          map(({ result, pagination }) =>
            MembersApiActions.loadMoreMembersSuccess({ members: result, pagination })
          ),
          catchError(error => of(MembersApiActions.loadMoreMembersFailure({ error }))),
        )
      })
    ));

}
