import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MemberService } from '@core/services/member.service';

import { MemberActions, MembersApiActions } from '@members/store/actions';

@Injectable()
export class MemberEffects {
  constructor(private actions$: Actions, private memberService: MemberService) {}

  LoadMember$ = createEffect(() => this.actions$.pipe(
    ofType(MemberActions.loadMember),
    mergeMap(({ id }) => {
      return this.memberService.getMemberDetails(id).pipe(
        map(user => MembersApiActions.loadMemberSuccess({ user })),
        catchError(error => of(MembersApiActions.loadMemberFailure({ error, id }))),
      );
    })
  ));

}
