import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { faCog, faHeart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { User } from "@models/User";
import { Observable } from "rxjs";
import { LayoutService } from "@layout/services/layout.service";

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
  theme$ = this.layout.theme$;

  @Input() user: User | any;


  @Output() logout = new EventEmitter<boolean>();

  constructor(private layout: LayoutService) {}

  onLogout() {
    this.logout.emit(true);
  }

  darkMode() {
    this.layout.toggle();
  }

  show() {
    this.showMenu = !this.showMenu;
  }

}
