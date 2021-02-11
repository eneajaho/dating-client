import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';
import { selectUserSettingsState, SettingsState } from '@settings/store/reducers';
import { loadEntity } from '@shared/helpers';
import { loadUserSettings } from '@settings/store/actions/settings.actions';

@Injectable()
export class SettingsGuard implements CanActivate {

  constructor(private store: Store<SettingsState>) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(selectUserSettingsState).pipe(
      map((userSettings) => {
        loadEntity(userSettings, () => this.store.dispatch(loadUserSettings()))
        return true;
      })
    );
  }

}
