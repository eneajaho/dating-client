import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  redirectToAuth,
  register, registerFailure,
  registerSuccess
} from '@auth/store/actions/auth.actions';

import { LocalStorageService } from '@core/services/local-storage.service';
import { AuthService } from '@auth/services';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private router: Router, private auth: AuthService,
              private local: LocalStorageService, private toast: ToastrService) {}

  Login$ = createEffect(() =>
    this.actions$.pipe(ofType(login),
      switchMap(({ credentials }) =>
        this.auth.login(credentials).pipe(
          map(user => {
            this.local.set('user', JSON.stringify(user));
            this.router.navigate([ '/' ]);
            return loginSuccess({ user })
          }),
          catchError(error => of(loginFailure({ error }))),
        ))
    ));

  Register$ = createEffect(() =>
    this.actions$.pipe(ofType(register),
      switchMap(({ credentials }) =>
        this.auth.register(credentials).pipe(
          map(x => {
            this.toast.success('You were successfully registered!');
            this.router.navigate([ '/auth/login' ]);
            return registerSuccess();
          }),
          catchError(error => of(registerFailure({ error })))
        ))
    ));

  RedirectToAuthPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(redirectToAuth),
      tap(() => this.router.navigate([ '/auth' ]))
    ), { dispatch: false }
  );

  Logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.local.remove('user');
        this.router.navigate([ '/auth/login' ]);
      })), { dispatch: false }
  );
}
