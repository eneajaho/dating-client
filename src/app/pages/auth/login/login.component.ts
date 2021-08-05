import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginPageStore } from './login-page.store';

@Component({
  selector: 'app-auth-login',
  template: `
    <h2 class="font-weight-bold mb-3" style="color: var(--text-color)">Login</h2>
    <ng-container *ngIf="store.state$ | async as vm">
      <app-login-form [loading]="vm.loading" (submitted)="store.login($event)">
        <error-alert
          *ngIf="vm.error" [error]="vm.error"
          (click)="store.setError(null)">
        </error-alert>
      </app-login-form>
    </ng-container>

    <br>
    <a routerLink="/auth/register" class="text-muted">
      Not registered yet? Register now!
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ LoginPageStore ]
})
export class LoginComponent {

  constructor(public store: LoginPageStore) { }

}
