import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "@root-store/root-state";
import { catchError, switchMap, tap } from "rxjs/operators";
import { MemberActions } from "@pages/members/members-store";
import { selectAuthUser } from "@root-store/auth-store/selectors/auth.selectors";
import { AuthActions } from "@root-store/auth-store";

@Injectable({
  providedIn: 'root'
})
export class MemberEditGuard implements CanActivate {

  constructor(private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkUser().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkUser(): Observable<boolean> {
    return this.store.select(selectAuthUser).pipe(
      tap(user => {
        if (!user) {
          this.store.dispatch(AuthActions.LOGOUT());
          return null;
        }
        this.store.dispatch(MemberActions.LOAD_MEMBER_DETAILS({ id: user.id }));
        return !!user;
      })
    );
  }

}
