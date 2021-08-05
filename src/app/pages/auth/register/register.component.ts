import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterPageStore } from './register-page.store';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <h3 class="mb-3">Relationships matter. <br>Build yours.</h3>
      <p class="lead">Join Dating now. It's free.</p>

      <ng-container *ngIf="store.state$ | async as vm">
        <app-register-form [loading]="vm.loading" (submitted)="store.register($event)">
          <span id="type">Register now</span>
          <error-alert
            *ngIf="vm.error" [error]="vm.error"
            (click)="store.setError(null)">
          </error-alert>
        </app-register-form>
      </ng-container>

      <div class="mt-3">
        <a routerLink="/auth/login" class="text-muted">
          Already have an account? Sign in.
        </a>
      </div>
    </div>
  `,
  styles: [ `
    .register-container {
      overflow-y: scroll;
      overflow-x: hidden;
      max-height: 100vh;
      padding: 25px 4px;
    }

    h3, p {
      color: var(--text-color)
    }
  `],
  providers: [ RegisterPageStore ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  constructor(public store: RegisterPageStore) { }

}
