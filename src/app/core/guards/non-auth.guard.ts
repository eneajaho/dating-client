import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuth from '@store/auth';
import { RootState } from '@store/reducers';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NonAuthGuard implements CanActivate {

  constructor(private store: Store<RootState>, private router: Router,
              private ngZone: NgZone) { }

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          /** Cannot access login/register page when user is logged in. */
          this.ngZone.run(() => this.router.navigateByUrl('/'));
          return false;
        }
        return true;
      }
      ),
      take(1));
  }
}
