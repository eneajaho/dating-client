import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <div class="spinner-grow {{ color ? 'text-'+color : '' }}"
         [class.medium]="size === 'medium'"
         [class.big]="size === 'big'"
         role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `,
  styles: [
    '.medium { width: 5rem; height: 5rem; }',
    '.big { width: 10rem; height: 10rem; }'
  ]
})
export class SpinnerComponent {

  @Input() size: 'medium' | 'big' | '' = '';
  @Input() color: string;

}
