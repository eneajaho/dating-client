import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-member-edit-navigation',
  template: `
    <ul class="list-group shadow rounded overflow-hidden">
      <li routerLink="/settings/account" routerLinkActive="active"
          class="list-group-item list-group-item-action">
        Account
      </li>
      <li routerLink="/settings/profile" routerLinkActive="active"
          class="list-group-item list-group-item-action">
        Profile
      </li>
      <li routerLink="/settings/photos" routerLinkActive="active"
          class="list-group-item list-group-item-action">
        Photos
      </li>
      <li routerLink="/settings/chat" routerLinkActive="active"
          class="list-group-item list-group-item-action">
        Chat & Messaging
      </li>
    </ul>
  `,
  styleUrls: [ './member-edit-navigation.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditNavigationComponent { }
