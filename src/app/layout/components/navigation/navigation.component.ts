import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from "../../../auth/models/User.model";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  @Input() user: User;

  @Output() logout = new EventEmitter<boolean>();

  onLogout() {
    this.logout.emit(true);
  }

}
