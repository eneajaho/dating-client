import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "@core/models";
import * as fromRoot from "@store/reducers";
import * as fromSettings from "@settings/store/reducers";
import { SettingsActions } from "@settings/store/actions";

@Injectable()
export class SettingsFacade {

  details$: Observable<User> = this.store.select(fromSettings.selectUserDetails);
  loading$: Observable<boolean> = this.store.select(fromSettings.selectUserDetailsLoading);
  loaded$: Observable<boolean> = this.store.select(fromSettings.selectUserDetailsLoaded);
  error$: Observable<string> = this.store.select(fromSettings.selectUserDetailsError);

  page$: Observable<string> = this.store.select(fromRoot.selectRouter).pipe(
    map(data => this.getPage(data))
  );

  constructor(private store: Store<fromSettings.State>) { }

  loadUserDetails() { this.store.dispatch(SettingsActions.loadAuthDetails()); }

  private getPage(routerState) {
    if (!routerState) { return null; }
    const tags = routerState?.state?.url?.split('/');
    if (tags[2] !== null && tags[2] !== '' && tags[2] !== undefined) { return tags[2]; }
    return '';
  }
}
