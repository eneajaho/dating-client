import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import {
  loginSuccess,
  logout,
  redirectToAuth, registerUserSuccess
} from '@store/auth/auth.actions';
import { LocalStorageService } from '@core/services/local-storage.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private auth: AuthService,
    private local: LocalStorageService,
    private toast: ToastrService
  ) { }

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(ofType(loginSuccess),
      tap(({ user }) => {
        this.local.set('user', JSON.stringify(user));
        this.toast.success(`Welcome back ${user.name}!`);
        this.router.navigate([ '/' ]);
      })
    ), { dispatch: false }
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(ofType(registerUserSuccess),
      tap(({ user }) => {
        this.local.set('user', JSON.stringify(user));
        this.toast.success('You were successfully registered!');
        this.router.navigate([ '/' ]);
      })
    ), { dispatch: false }
  );

  redirectToAuthPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(redirectToAuth),
      tap(() => this.router.navigate([ '/auth' ]))
    ), { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.local.remove('user');
        this.router.navigate([ '/auth/login' ]);
      })), { dispatch: false }
  );
}
