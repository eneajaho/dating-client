import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import * as fromAuth from '@auth/store/reducers';
import { AuthActions } from "@auth/store/actions";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>) { }

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      map(isLoggedIn => {
          if (!isLoggedIn) {
            /** If the user is not logged in, he gets redirected to login page */
            this.store.dispatch(AuthActions.authRedirect());
            return false;
          }
          return true;
        }
      ),
      take(1)
    );
  }

}
