import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs/operators';

import { LocalStorageService } from '@core/services/local-storage.service';
import { logout, redirectToAuth } from '@auth/store/actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private router: Router,
              private local: LocalStorageService) {}

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
