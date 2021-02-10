import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { MemberActions } from '@members/store/actions';
import { map } from 'rxjs/operators';
import { MembersState } from '@members/store/reducers';
import { selectAuthenticatedUserId } from '@auth/store/reducers';

@Injectable({ providedIn: 'root' })
export class MemberGuard implements CanActivate {

  constructor(private store: Store<MembersState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {

    const id = +route.params.memberId;
    if (!id) { return of(true); }

    // to prevent adding user details in members entities
    return this.store.select(selectAuthenticatedUserId).pipe(
      map(userId => {
        if (userId !== id) {
          this.store.dispatch(MemberActions.loadMember({ id }));
        }
        return true;
      })
    );
  }

}
