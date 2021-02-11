import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '@core/services/member.service';
import { SettingsActions } from '@settings/store/actions';
import { selectUserProfileSettings, SettingsState } from '@settings/store/reducers';
import { AuthState, selectAuthenticatedUserId } from '@auth/store/reducers';
import { Store } from '@ngrx/store';
import { loadUserSettings } from '@settings/store/actions/settings.actions';
import { User } from '@core/models';

@Injectable()
export class SettingsEffects {

  constructor(private actions$: Actions,
              private memberService: MemberService,
              private store: Store<AuthState & SettingsState>,
              private toast: ToastrService) {
  }

  LoadUserSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserSettings),
      switchMap(() => this.store.select(selectAuthenticatedUserId)),
      switchMap(id => {
          if (!id) {
            const error = 'User id doesn\'t exist';
            return of(SettingsActions.loadUserSettingsFailure({ error }));
          }
          return this.memberService.getMemberDetails(id).pipe(
            map(user => SettingsActions.loadUserSettingsSuccess({ user })),
            catchError(error => of(SettingsActions.loadUserSettingsFailure({ error }))),
          );
        }
      )
    ));

  EditUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(SettingsActions.editUserSettings),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.select(selectUserProfileSettings)))
    ),
    exhaustMap(([{ userData }, userProfile ]) => {
      const payload: User = { ...userProfile, ...userData };
      return this.memberService.editMember(payload).pipe(
        map(user => {
          this.toast.success('Profile was successfully updated!');
          return SettingsActions.editUserSettingsSuccess({ user });
        }),
        catchError(error => {
          this.toast.error(error);
          return of(SettingsActions.editUserSettingsFailure({ error }));
        }),
      );
    })
    )
  );

}
