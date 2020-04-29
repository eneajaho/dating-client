import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { switchMap } from 'rxjs/operators';
import { of } from "rxjs";

import { CookieService } from "ngx-cookie-service";
import { AuthActions } from "@root-store/auth-store";
import { LocalStorageService } from "@core/services/local-storage.service";

@Injectable()
export class RootEffects {

  constructor(private actions$: Actions, private localStorage: LocalStorageService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => {
        const cookieExists = !!this.localStorage.get('user');
        let user = null;
        if (cookieExists) {
          user = JSON.parse(this.localStorage.get('user'));
        }
        return of(AuthActions.GET_USER_COOKIE({ user }))
      })));
}
