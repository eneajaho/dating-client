import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUserSettings } from '@settings/store/actions/settings.actions';
import { selectUserSettingsState, SettingsState } from '@settings/store/reducers';
import { routerAnimation } from '@shared/animations/router.animation';
import { selectRouter } from '@store/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserSettingsState } from './store/reducers/settings.reducer';


@Component({
  template: `
    <div class="container-fluid mt-5">
      <div *ngIf="vm$ | async as vm" class="row justify-content-center mb-5 pb-100">

        <div *ngIf="vm.loading" class="flex-center mt-5 mb-3">
          <spinner size="medium"></spinner>
        </div>

        <div *ngIf="vm.error" class="col-12 col-sm-10 col-md-6 flex-center my-4">
          <div class="error alert-error py-4">
            {{ vm.error }}
            <span class="retry cp" (click)="loadUserSettings()">Retry?</span>
          </div>
        </div>

        <div *ngIf="vm.loaded && !vm.error" class="col-xs-12 col-sm-10 col-lg-9">

          <div class="row justify-content-center">
            <div class="col-12">
              <app-settings-header
                *ngIf="page$ | async as page"
                [page]="page"
                [profilePicture]="vm.user.photoUrl ? vm.user.photoUrl : undefined"
                [userName]="vm.user.knownAs">
              </app-settings-header>
            </div>
          </div>

          <div class="row justify-content-center mt-4">
            <div class="col-3">
              <app-member-edit-navigation></app-member-edit-navigation>
            </div>
            <div class="col-9">
              <div class="card shadow border-0 rounded overflow-hidden">
                <div [@routerAnimations]="prepareRoute(outlet)" class="card-body">
                  <router-outlet #outlet="outlet"></router-outlet>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  `,
  styles: [ `
    .card {
      background: var(--bg-color-light);
      color: var(--text-color);
    }
    .retry {
      color: var(--text-color)
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routerAnimation ]
})
export class SettingsLayoutComponent {

  vm$: Observable<UserSettingsState> = this.store.select(selectUserSettingsState);

  page$: Observable<'profile' | 'account' | 'chat' | 'photos'> = this.store.select(selectRouter).pipe(
    map(data => this.getPage(data))
  );

  test: 'a' | 'b' | 'c' = 'a';

  constructor(private store: Store<SettingsState>) { }

  loadUserSettings() {
    this.store.dispatch(loadUserSettings());
  }

  private getPage(routerState: { state: any; navigationId?: number; }): 'profile' | 'account' | 'chat' | 'photos' {
    if (!routerState) { return 'profile'; }
    const tags = routerState?.state?.url?.split('/');
    if (tags[ 2 ] !== null && tags[ 2 ] !== '' && tags[ 2 ] !== undefined) { return tags[ 2 ]; }
    return 'profile';
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation ?? '*';
  }

}
