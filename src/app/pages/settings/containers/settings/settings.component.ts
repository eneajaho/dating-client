import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { routerAnimation } from '@shared/animations/router.animation';
import { RouterOutlet } from '@angular/router';
import { UserSettingsState } from '@settings/store/reducers/settings.reducer';
import { selectUserSettingsState, SettingsState } from '@settings/store/reducers';
import { map } from 'rxjs/operators';
import { selectRouter } from '@store/reducers';
import { Store } from '@ngrx/store';
import { loadUserSettings } from '@settings/store/actions/settings.actions';

@Component({
  selector: 'app-account-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routerAnimation ]
})
export class SettingsComponent {

  vm$: Observable<UserSettingsState> = this.store.select(selectUserSettingsState);

  page$: Observable<'profile' | 'account' | 'chat' | 'photos'> = this.store.select(selectRouter).pipe(
    map(data => this.getPage(data))
  );

  constructor(private store: Store<SettingsState>) { }

  loadUserSettings() {
    this.store.dispatch(loadUserSettings());
  }

  private getPage(routerState: { state: any; navigationId?: number; }): 'profile' | 'account' | 'chat' | 'photos' {
    if (!routerState) { return 'profile'; }
    const tags = routerState?.state?.url?.split('/');
    if (tags[2] !== null && tags[2] !== '' && tags[2] !== undefined) { return tags[2]; }
    return 'profile';
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation ?? '*';
  }

}
