import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromAuth from '@auth/store/reducers';

@Injectable({ providedIn: 'root' })
export class NonAuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>, private router: Router,
              private ngZone: NgZone) { }

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      map(isLoggedIn => {
          if (isLoggedIn) {
            /** Cannot access login/register page when user is logged in. */
            this.ngZone.run(() => this.router.navigateByUrl( '/'));
            return false;
          }
          return true;
        }
      ),
      take(1));
  }
}
