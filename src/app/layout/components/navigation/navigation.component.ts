import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCog, faComments, faHeart, faSignOutAlt, faStar, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/User';

export interface MenuItem {
  title: string;
  link: string;
  icon: any;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {

  logoutIcon = faSignOutAlt as IconProp;
  settingsIcon = faCog as IconProp;
  userIcon = faUser as IconProp;
  heartIcon = faHeart as IconProp;

  showMenu = false;

  menuItems: MenuItem[] = [
    {
      title: 'Members',
      link: '/members/all',
      icon: faUsers,
    },
    {
      title: 'Matches',
      link: '/matches',
      icon: faStar,
    },
    {
      title: 'Messages',
      link: '/messages',
      icon: faComments,
    }
  ];

  @Input() user: User | any;

  @Output() logout = new EventEmitter<boolean>();

  onLogout() { this.logout.emit(true); }

  show() { this.showMenu = !this.showMenu; }

}
