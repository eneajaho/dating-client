import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
import { MembersPageActions } from '@members/store/actions';
import * as fromMembers from '@members/store/reducers';
import { MembersState } from '@members/store/reducers';
import { combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MembersGuard implements CanActivate {

  constructor(private store: Store<MembersState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return combineLatest([
      this.store.select(fromMembers.selectMembersLoaded),
      this.store.select(fromMembers.selectMembersLoading)
    ]).pipe(
      tap(([ loaded, loading ]) => {
        if (!loaded && !loading) {
          this.store.dispatch(MembersPageActions.loadMembers({ filters: {} }));
        }
      }),
      map(() => true)
    );
  }

}

