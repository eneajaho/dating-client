import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from "@root-store/index";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, filter, map, switchMap, take, tap } from "rxjs/operators";
import { MembersActions, MembersSelectors } from "@pages/members/members-store";

@Injectable({ providedIn: 'root' })
export class MembersGuard implements CanActivate {

  constructor(private store: Store<AppState>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.checkStore().pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(MembersSelectors.selectMembers).pipe(
      tap(members => {
        if (!members) { this.store.dispatch(MembersActions.LOAD_MEMBERS()); }
        console.log(members);
      }),
      map(members => !!members),
      filter((loaded: boolean) => loaded),
      take(1)
    );
  }

}

