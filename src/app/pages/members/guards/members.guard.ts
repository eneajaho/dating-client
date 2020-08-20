import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { filter, map, switchMap, take, tap } from "rxjs/operators";
import { MemberActions, MembersPageActions } from "@members/store/actions";
import * as fromMembers from '@members/store/reducers';
import * as fromAuth from '@auth/store/reducers';

@Injectable({ providedIn: 'root' })
export class MembersGuard implements CanActivate {

  constructor(private store: Store<fromMembers.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => this.checkProfile(state.url)),
      switchMap(() => this.checkMember(+route.params.memberId)),
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromMembers.selectMembersLoaded).pipe(
      tap(loaded => {
        if (!loaded) { this.store.dispatch(MembersPageActions.loadMembers()); }
      }),
      filter((loaded: boolean) => loaded),
      take(1));
  }

  checkMember(id: number) {
    if (!id) { return of(true); }
    this.store.dispatch(MemberActions.loadMember({ id }))
    return of(true);
  }

  checkProfile(urlState: string) {
    if (urlState.includes('/members/edit')) {
      return this.store.select(fromAuth.selectUserId).pipe(
          tap(id => this.store.dispatch(MemberActions.loadMember({ id }))),
          map(() => of(true))
        );
    }
    return of(true);
  }

}

