import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthApiActions, RegisterPageActions } from '@auth/store/actions';
import { AuthService } from '@auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RegisterEffects {

  Register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterPageActions.register),
      switchMap(({ credentials }) =>
        this.auth.register(credentials).pipe(
          map(() => {
            this.toast.success('', 'You were registered successfully!');
            this.router.navigate([ '/auth/login' ]);
            return AuthApiActions.registerSuccess();
          }),
          catchError(error => of(AuthApiActions.registerFailure({ error })))
        ))
    )
  );

  constructor(private actions$: Actions, private auth: AuthService,
              private router: Router, private toast: ToastrService) {
  }

}
