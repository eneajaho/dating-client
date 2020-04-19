import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import { AuthSelectors, RootStoreState } from "../../root-store";
import { User } from "../../auth/models/User.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuthenticated$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.State>, private router: Router) {
    this.isAuthenticated$ = this.store$.select(AuthSelectors.selectIsAuthenticated);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isAuthenticated$.pipe(map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate([ '/auth/login' ]);
        }
        return isAuthenticated;
      }
    ));

  }

}
