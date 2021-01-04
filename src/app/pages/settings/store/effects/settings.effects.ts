import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { MemberService } from "@core/services";
import { SettingsActions } from "@settings/store/actions";
import * as fromSettings from "@settings/store/reducers";
import * as fromAuth from "@auth/store/reducers";
import { Store } from "@ngrx/store";

@Injectable()
export class SettingsEffects {

  constructor(private actions$: Actions,
              private memberService: MemberService,
              private store: Store<fromAuth.State & fromSettings.State>,
              private toast: ToastrService) {
  }

  LoadAuthDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.loadAuthDetails),
      switchMap(() => this.store.select(fromAuth.selectUserId)),
      switchMap(id => {
          if (!id) {
            let error = 'User id doesn\'t exist';
            return of(SettingsActions.loadAuthDetailsFailure({ error }));
          }
          return this.memberService.getMemberDetails(id).pipe(
            map(user => SettingsActions.loadAuthDetailsSuccess({ user })),
            catchError(error => of(SettingsActions.loadAuthDetailsFailure({ error }))),
          );
        }
      )
    ));

  EditUserDetails$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.editAuthDetails),
    exhaustMap(({ user }) => {
      return this.memberService.editMember(user).pipe(
        map(user => {
          this.toast.success('', 'Profile updated successfully!');
          return SettingsActions.editAuthDetailsSuccess({ user })
        }),
        catchError(error => {
          this.toast.error('', error);
          return of(SettingsActions.editAuthDetailsFailure({ error }))
        }),
      )
    })
    )
  )

}
