import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@models/User';

import { SettingsFacade } from './settings.facade';
import { routerAnimation } from '@shared/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ SettingsFacade ],
  animations: [ routerAnimation ]
})
export class SettingsComponent {

  details$: Observable<User> = this.settings.details$;
  loading$ = this.settings.loading$;
  error$ = this.settings.error$;

  showSettings$ = this.settings.showSettings$;

  page$: Observable<string> = this.settings.page$;

  loadData() { this.settings.loadUserDetails(); }

  constructor(private settings: SettingsFacade) { }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation ?? '*';
  }

}
