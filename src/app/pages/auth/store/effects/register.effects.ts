import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from "rxjs";

import { AuthApiActions, RegisterPageActions } from "@auth/store/actions";
import { AuthService } from "@core/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class RegisterEffects {

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterPageActions.register),
      switchMap(({ credentials }) =>
        this.auth.register(credentials).pipe(
          map(user => {
            this.toast.success('', 'You were registered successfully!');
            return AuthApiActions.registerSuccess();
          }),
          catchError(error => of(AuthApiActions.registerFailure({ error })))
        ))
    ));

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.registerSuccess),
      tap(() => this.router.navigate([ '/auth/login' ]))
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private auth: AuthService,
              private router: Router, private toast: ToastrService) {}

}
