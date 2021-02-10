import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '@auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { register, registerFailure, registerSuccess } from '@auth/store/actions/auth.actions';

@Injectable()
export class RegisterEffects {

  Register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({ credentials }) =>
        this.auth.register(credentials).pipe(
          map(() => {
            this.toast.success('You were successfully registered!');
            this.router.navigate([ '/auth/login' ]);
            return registerSuccess();
          }),
          catchError(error => of(registerFailure({ error })))
        ))
    )
  );

  constructor(private actions$: Actions, private auth: AuthService,
              private router: Router, private toast: ToastrService) {
  }

}
