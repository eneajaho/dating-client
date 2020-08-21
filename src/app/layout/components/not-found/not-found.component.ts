import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [` h1 { color: var(--text-color)  }  `]
})
export class NotFoundComponent {
  faHome = faHome;
}
