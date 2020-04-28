import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { switchMap } from 'rxjs/operators';
import { of } from "rxjs";

import { CookieService } from "ngx-cookie-service";
import { AuthActions } from "@root-store/auth-store";

@Injectable()
export class RootEffects {

  constructor(private actions$: Actions, private cookies: CookieService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => {
        const cookieExists = this.cookies.check('user');
        let user = null;
        if (cookieExists) {
          user = JSON.parse(this.cookies.get('user'));
        }
        return of(AuthActions.GET_USER_COOKIE({ user }))
      })));
}
