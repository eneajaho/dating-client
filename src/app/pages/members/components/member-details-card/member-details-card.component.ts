import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { User } from "@models/User";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt, faHeart } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-member-details-card',
  templateUrl: './member-details-card.component.html',
  styleUrls: [ './member-details-card.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  @Input() user: User;

  ngOnChanges() {
    const cleanStr = this.user.interests?.replace(/[^a-zA-Z ]/g, '');
    this.interests = cleanStr?.split(' ');
  }

  getBackground() {
    return {
      'background-image': `linear-gradient(0, #000000e8 10%, #6b0fc02b 50%),
                                  url(${ this.covers[this.user.id % 4] })`
    };
  }

}
