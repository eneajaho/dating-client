import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthState, selectLoggedIn } from '@auth/store/reducers';
import { redirectToAuth } from '@auth/store/actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AuthState>) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectLoggedIn).pipe(
      map(isLoggedIn => {
          if (!isLoggedIn) {
            /** If the user is not logged in, he gets redirected to login page */
            this.store.dispatch(redirectToAuth());
            return false;
          }
          return true;
        }
      ),
      take(1)
    );
  }

}
