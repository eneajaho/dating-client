import { RootState } from '@store/reducers';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { routerAnimation } from '@shared/animations/router.animation';
import { selectAuthUser } from '@store/auth';

import { logout } from '@store/auth/auth.actions';

@Component({
  selector: 'main-layout',
  template: `
    <app-navigation
      [user]="user$ | async"
      (logout)="handleLogout()">
    </app-navigation>

    <div [@routerAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routerAnimation ]
})
export class MainLayoutComponent {

  user$ = this.store.select(selectAuthUser);

  constructor(private store: Store<RootState>) { }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation ?? '*';
  }

  handleLogout(): void {
    this.store.dispatch(logout());
  }

}
