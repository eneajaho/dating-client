import { Component, Input } from '@angular/core';
import { User } from "@models/User";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-member-details-card',
  templateUrl: './member-details-card.component.html',
  styleUrls: ['./member-details-card.component.scss']
})
export class MemberDetailsCardComponent {

  @Input() user: User;

  locationIcon = faMapMarkerAlt;
  sendIcon = faComment;
  loveIcon = faHeart;

}
