import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { faCog, faComments, faHeart, faSignOutAlt, faStar, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { User } from '@models/User';

export interface MenuItem {
  title: string,
  link: string,
  icon: any,
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {

  logoutIcon = faSignOutAlt;
  settingsIcon = faCog;
  userIcon = faUser;
  heartIcon = faHeart;

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
