import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from "@ngrx/store";

import { MemberActions } from "@members/store/actions";
import * as fromMembers from "@members/store/reducers";
import * as fromAuth from '@auth/store/reducers';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class MemberGuard implements CanActivate {

  constructor(private store: Store<fromMembers.State & fromAuth.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {

    const id = +route.params.memberId;
    if (!id) { return of(true); }

    // to prevent adding user details in members entities
    return this.store.select(fromAuth.selectUserId).pipe(
      map(userId => {
        if (userId !== id) {
          this.store.dispatch(MemberActions.loadMember({ id }));
        }
        return true;
      })
    )
  }

}
