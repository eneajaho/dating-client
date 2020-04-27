import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { LOAD_MEMBERS, LOAD_MEMBERS_FAILURE, LOAD_MEMBERS_SUCCESS } from "../actions/members.actions";
import { MemberService } from "../services/member.service";

@Injectable()
export class MembersEffects {
  constructor(private actions$: Actions, private memberService: MemberService) {}

  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_MEMBERS),
      mergeMap(() =>
        this.memberService.getMembers().pipe(
          map(members => LOAD_MEMBERS_SUCCESS({ members })),
          catchError(error => of(LOAD_MEMBERS_FAILURE({ error }))),
        ))));
}
