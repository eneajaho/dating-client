import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { User } from '@core/models';
import * as fromRoot from '@store/reducers';
import * as fromSettings from '@settings/store/reducers';
import { SettingsState } from '@settings/store/reducers';
import { SettingsActions } from '@settings/store/actions';

@Injectable()
export class SettingsFacade {

  details$: Observable<User> = this.store.select(fromSettings.selectUserDetails);
  loading$ = this.store.select(fromSettings.selectUserDetailsLoading);
  loaded$ = this.store.select(fromSettings.selectUserDetailsLoaded);
  error$ = this.store.select(fromSettings.selectUserDetailsError);

  showSettings$ = this.loaded$.pipe(withLatestFrom(this.error$)).pipe(
    map(([loaded, error]) => loaded && !error)
  );

  page$: Observable<string> = this.store.select(fromRoot.selectRouter).pipe(
    map(data => this.getPage(data))
  );

  constructor(private store: Store<SettingsState>) { }

  loadUserDetails() { this.store.dispatch(SettingsActions.loadAuthDetails()); }

  private getPage(routerState: { state: any; navigationId?: number; }) {
    if (!routerState) { return null; }
    const tags = routerState?.state?.url?.split('/');
    if (tags[2] !== null && tags[2] !== '' && tags[2] !== undefined) { return tags[2]; }
    return '';
  }

}
