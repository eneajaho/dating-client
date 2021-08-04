import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoggedIn } from '@store/auth';
import { redirectToAuth } from '@store/auth/auth.actions';
import { RootState } from '@store/reducers';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private store: Store<RootState>) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectLoggedIn).pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          /** If the user is not logged in, he will be redirected to login page */
          this.store.dispatch(redirectToAuth());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

}
