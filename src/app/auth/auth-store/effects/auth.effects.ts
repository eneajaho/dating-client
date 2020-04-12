import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { of } from "rxjs";

import { AuthService } from "../../services/auth.service";
import * as AuthActions from '../actions/login.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_REQUEST),
      exhaustMap(action =>
        this.authService.login(action.credentials).pipe(
          tap(data => console.log(data)),
          map(user => AuthActions.LOGIN_SUCCESS({ user })),
          catchError(error => of(AuthActions.LOGIN_FAILURE(error)))
        )
      )
    )
  );

}
