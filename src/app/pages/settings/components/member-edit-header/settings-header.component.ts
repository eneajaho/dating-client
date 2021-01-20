import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@core/models';

interface PageDetails {
  profile: string;
  account: string;
  chat: string;
  photos: string;
}

@Component({
  selector: 'app-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: [ './settings-header.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsHeaderComponent {

  @Input() user!: User;

  @Input()
  set page(name: keyof PageDetails) {
    this._page.name = name;
    this._page.description = this.pageDetails[name];
  }

  _page = {
    name: '',
    description: ''
  };

  pageDetails: PageDetails = {
    profile: 'Update your profile details, ex. bio, interests...',
    account: 'Manage your account details, ex. username, profile picture...',
    chat: 'Modify your chat settings, ex. chat requests, chat blocking...',
    photos: 'View, add or remove your photos...'
  };

  profilePicture() {
    if (this.user?.photoUrl) {
      return { 'background-image': `url(${ this.user.photoUrl })` };
    }
    return { 'background-image': `url(https://i.imgur.com/bLrOP4M.png)` };
  }

}
