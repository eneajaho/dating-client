import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from "@models/User";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

  @Input() user: User | any;

  @Output() logout = new EventEmitter<boolean>();

  onLogout() {
    this.logout.emit(true);
  }

}
