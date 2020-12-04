import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { map, take, tap } from "rxjs/operators";
import { MembersPageActions } from "@members/store/actions";
import * as fromMembers from '@members/store/reducers';

@Injectable({ providedIn: 'root' })
export class MembersGuard implements CanActivate {

  constructor(private store: Store<fromMembers.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromMembers.selectMembersLoaded).pipe(
      tap(loaded => { if (!loaded) {
        this.store.dispatch(MembersPageActions.loadMembers(
          { pageNumber: '1', pageSize: '2' })
        )}
      }),
      map(() => true),
      take(1)
    );
  }


}

