import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from "rxjs";

import { LocalStorageService } from "@core/services/local-storage.service";
import { AuthService } from "@auth/services/auth.service";
import { AuthApiActions, LoginPageActions } from "@auth/store/actions";

@Injectable()
export class LoginEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(ofType(LoginPageActions.login),
      switchMap(({ credentials }) =>
        this.auth.login(credentials).pipe(
          map(user => AuthApiActions.loginSuccess({ user })),
          catchError(error => of(AuthApiActions.loginFailure({ error }))),
        ))
    ));

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginSuccess),
      tap(({ user }) => {
        this.local.set('user', JSON.stringify(user))
        this.router.navigate([ '/' ])
      })
    ), { dispatch: false });


  constructor(private actions$: Actions,  private auth: AuthService,
              private router: Router, private local: LocalStorageService) {}

}
