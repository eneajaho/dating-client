import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { MemberService } from "../services/member.service";
import { Store } from "@ngrx/store";

import * as fromMembers from '@members/store/reducers';
import { MemberActions, MemberEditPageActions, MembersApiActions } from "@members/store/actions";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class MemberEffects {
  constructor(private actions$: Actions,
              private toast: ToastrService,
              private memberService: MemberService,
              private store: Store<fromMembers.State>) {}

  loadMember$ = createEffect(() => this.actions$.pipe(
    ofType(MemberActions.loadMember),
    switchMap(({ id }) => {
      return this.memberService.getMemberDetails(id).pipe(
        map(user => MembersApiActions.loadMemberSuccess({ user })),
        catchError(error => of(MembersApiActions.loadMemberFailure({ error, id }))),
      )
    })
  ));

  editMember$ = createEffect(() => this.actions$.pipe(
    ofType(MemberEditPageActions.editMember),
    switchMap(({ user }) => {
      return this.memberService.editMember(user).pipe(
        map(user => {
          this.toast.success('', 'Profile updated successfully!');
          return MembersApiActions.editMemberSuccess({ user })
        }),
        catchError(error => {
          this.toast.error('', error);
          return of(MembersApiActions.editMemberFailure({ error, id: user.id }))
        }),
      )
    })
  ));
}
