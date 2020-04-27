import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from "@models/User";
import { faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberCardComponent {
  @Input() user: User;

  locationIcon = faMapMarkerAlt;
  sendIcon = faPaperPlane;
}
