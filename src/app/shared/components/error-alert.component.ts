import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'error-alert',
  template: `
    <ng-template *ngIf="error">
      <div class="alert alert-error cp mb-1">
        {{ error }}
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorAlertComponent {

  @Input() error: string;

}
