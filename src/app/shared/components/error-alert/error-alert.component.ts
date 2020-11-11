import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'error-alert',
  template: `
    <ng-container *ngIf="error">
      <div class="alert alert-error error cp mb-1">
        {{ error }}
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorAlertComponent {

  @Input() error: string | null = null;

}
