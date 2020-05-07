import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from "@root-store/index";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, filter, map, switchMap, take, tap } from "rxjs/operators";
import { MemberActions, MembersActions, MembersSelectors } from "@pages/members/members-store";

@Injectable({ providedIn: 'root' })
export class MembersGuard implements CanActivate {

  constructor(private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkStore().pipe(
      tap(() => this.checkMember(+route.params.memberId)),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(MembersSelectors.selectMembers).pipe(
      tap(members => {
        if (!members || members?.length <= 1) { this.store.dispatch(MembersActions.LOAD_MEMBERS()); }
      }),
      map(members => !!members),
      filter((loaded: boolean) => loaded),
      take(1)
    );
  }

  checkMember(id: number) {
    if (id){
      this.store.dispatch(MemberActions.LOAD_MEMBER_DETAILS({ id }))
    }
  }

}

