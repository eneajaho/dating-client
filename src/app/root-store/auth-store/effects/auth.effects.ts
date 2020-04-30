import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { of } from "rxjs";

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "@core/services/local-storage.service";

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private auth: AuthService,
              private router: Router,
              private localStorage: LocalStorageService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_REQUEST),
      switchMap(action =>
        this.auth.login(action.credentials).pipe(
          map(user => {
            this.localStorage.set('user', JSON.stringify(user))
            return AuthActions.LOGIN_SUCCESS({ user })
          }),
          catchError(error => of(AuthActions.LOGIN_FAILURE({ error }))),
        ))));

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER_REQUEST),
      switchMap(action =>
        this.auth.register(action.credentials).pipe(
          map(user => AuthActions.REGISTER_SUCCESS({ user })),
          catchError(error => of(AuthActions.REGISTER_FAILURE({ error })))
        ))));

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_SUCCESS),
      tap(() => this.router.navigate([ '/' ]))
    ), { dispatch: false });

  registerRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER_SUCCESS),
      tap(() => this.router.navigate([ '/auth/login' ]))
    ), { dispatch: false });

  logoutRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        this.localStorage.remove('user');
        this.router.navigate([ '/auth/login' ])
      })), { dispatch: false });
}
