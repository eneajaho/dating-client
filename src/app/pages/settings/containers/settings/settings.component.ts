import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "@models/User";

import { SettingsFacade } from "./settings.facade";

@Component({
  selector: 'app-account-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ SettingsFacade ]
})
export class SettingsComponent {

  details$: Observable<User> = this.settings.details$;
  loading$: Observable<boolean> = this.settings.loading$;
  loaded$: Observable<boolean> = this.settings.loaded$;
  error$: Observable<string> = this.settings.error$;

  page$: Observable<string> = this.settings.page$;

  loadData() { this.settings.loadUserDetails(); }

  constructor(private settings: SettingsFacade) { }

}
