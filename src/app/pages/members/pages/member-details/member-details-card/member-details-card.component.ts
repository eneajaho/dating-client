import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { User } from '@models/User';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { Status } from '@core/models';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-member-details-card',
  templateUrl: './member-details-card.component.html',
  styleUrls: [ './member-details-card.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDetailsCardComponent implements OnChanges {

  interests: string[] | undefined = [];

  colors = [ 'primary', 'danger', 'info', 'success' ];

  locationIcon = faMapMarkerAlt as IconProp;
  calendarIcon = faCalendarAlt as IconProp;

  @Input() user!: User & Status;

  ngOnChanges() {
    this.interests = this.user?.interests?.split(',');
  }

  getCover() {
    return {
      'background-image': `
        linear-gradient(0, #000000e8 10%, #6b0fc02b 50%),
        url(https://i.imgur.com/t6xCnGT.jpg)`
    };
  }

  getProfilePicture() {
    if (this.user?.photoUrl) {
      return { 'background-image': `url(${ this.user.photoUrl })` };
    }
    return { 'background-image': `url(https://i.imgur.com/bLrOP4M.png)` };
  }

}
