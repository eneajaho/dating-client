import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@models/User';
import { faMapMarkerAlt, } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { fadeIdAnimation } from '@shared/animations/fadeIn.animation';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ fadeIdAnimation ]
})
export class MemberCardComponent {

  @Input() user!: User;

  constructor(private router: Router) {}

  locationIcon = faMapMarkerAlt as IconProp;
  sendIcon = faComment as IconProp;
  loveIcon = faHeart as IconProp;

  goToMember() {
    this.router.navigate(['/members', this.user?.id]);
  }

  getBackground() {
    if (this.user?.photoUrl) {
      return { 'background-image': `url(${ this.user.photoUrl })` };
    }
    return { 'background-color': 'grey' };
  }
}
