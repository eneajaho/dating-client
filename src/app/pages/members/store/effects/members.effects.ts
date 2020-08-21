import { Injectable } from "@angular/core";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { MembersApiActions, MembersPageActions } from "@members/store/actions";
import { MemberService } from "../../services/member.service";
import * as fromMembers from '@members/store/reducers';

@Injectable()
export class MembersEffects {
  constructor(private actions$: Actions, private memberService: MemberService,
              private store: Store<fromMembers.State>) {}

  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersPageActions.loadMembers),
      switchMap(() => {
        return this.memberService.getMembers().pipe(
          map(members => MembersApiActions.loadMembersSuccess({ members })),
          catchError(error => of(MembersApiActions.loadMembersFailure({ error }))),
        )
      })
    ));

}
