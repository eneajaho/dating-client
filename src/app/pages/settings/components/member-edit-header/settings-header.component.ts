import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from "@core/models";
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: ['./settings-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsHeaderComponent {

  userIcon = faUser;

  @Input() user: User;

  @Input()
  set page(name: string) {
    this._page.name = name;
    this._page.description = this.pageDetails[name];
  }

  _page = {
    name: '',
    description: ''
  };

  pageDetails = {
    profile: 'Update your profile details, ex. bio, interests...',
    account: 'Manage your account details, ex. username, profile picture...',
    // email: 'Change your email or add recovery email.',
    // password: 'Update your account password.',
    chat: 'Modify your chat settings, ex. chat requests, chat blocking...',
    photos: 'View, add or remove your photos...'
  }

  getProfilePicture() {
    if (this.user?.photoUrl) {
      return { 'background-image': `url(${ this.user.photoUrl })` };
    }
    return { 'background-image': `url(https://i.imgur.com/bLrOP4M.png)` };
  }

}
