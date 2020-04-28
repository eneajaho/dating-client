import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "@root-store/root-state";
import { AuthSelectors } from "@root-store/auth-store";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class NonAuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(AuthSelectors.selectIsAuthenticated)
      .pipe(map(isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate([ '/' ]);
          }
          return true;
        }
      ));
  }
}
