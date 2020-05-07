import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from "@ngrx/store";
import { map, take } from "rxjs/operators";

import * as fromAuth from '@auth/store/reducers';
import { AuthActions } from "@auth/store/actions";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>) {}

  canActivate() {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      map(isAuthenticated => {
          if (!isAuthenticated) {
            this.store.dispatch(AuthActions.authRedirect());
            return false;
          }
          return true;
        }
      ),
      take(1));
  }

}
