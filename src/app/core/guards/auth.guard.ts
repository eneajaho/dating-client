import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { AppState } from "@root-store/index";
import { AuthSelectors } from "@root-store/auth-store";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isAuthenticated$.pipe(map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate([ '/auth/login' ]);
        }
        return true;
      }
    ));
  }

}
