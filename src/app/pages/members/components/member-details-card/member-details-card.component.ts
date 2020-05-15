import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { User } from "@models/User";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-member-details-card',
  templateUrl: './member-details-card.component.html',
  styleUrls: [ './member-details-card.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDetailsCardComponent implements OnChanges {

  interests: string[];

  colors = [ 'primary', 'danger', 'info', 'success' ];

  covers = [
    'https://i.imgur.com/6hU9Fb2.png',
    'https://i.imgur.com/t6xCnGT.jpg',
    'https://i.imgur.com/whSVWhd.jpg',
    'https://i.imgur.com/eiyHiMi.jpg',
  ]

  locationIcon = faMapMarkerAlt;
  calendarIcon = faCalendarAlt;
  clockIcon = faClock;

  @Input() user: User;

  ngOnChanges() {
    this.interests = this.user.interests?.split(',');
  }

  getCover() {
    return {
      'background-image': `linear-gradient(0, #000000e8 10%, #6b0fc02b 50%),
                                  url(${ this.covers[this.user.id % 4] })`
    };
  }

  getProfilePicture() {
    if (this.user?.photoUrl) {
      return { 'background-image': `url(${ this.user.photoUrl })` };
    }
    return { 'background-image': `url(https://i.imgur.com/bLrOP4M.png)` };
  }

}
