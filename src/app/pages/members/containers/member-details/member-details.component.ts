import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faUserCog } from '@fortawesome/free-solid-svg-icons';

import { MembersState, selectSelectedMember } from '@members/store/reducers';
import { selectUserProfileSettings, SettingsState } from '@settings/store/reducers';
import { User } from '@models/User';
import { Status } from '@core/models';
import { ActivatedRoute } from '@angular/router';
import { loadUserSettings } from '@settings/store/actions/settings.actions';
import { loadMember } from '@members/store/actions/member.actions';
import { switchMap, tap } from 'rxjs/operators';
import { loadEntity } from '@shared/helpers';
import { fadeIdAnimation } from '@shared/animations/fadeIn.animation';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ fadeIdAnimation ]
})
export class MemberDetailsComponent implements OnInit {

  userDetails$?: Observable<(User & Status) | undefined>;
  showEditBtn = false;

  sendIcon = faComment as IconProp;
  userEditIcon = faUserCog as IconProp;
  backIcon = faArrowLeft as IconProp;

  constructor(private store: Store<MembersState & SettingsState>,
              private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.userDetails$ = this.route.params.pipe(
      // gets the memberId from the router
      switchMap(({ memberId }) => {
        if (memberId === 'profile') {
          //  it's authenticated user so show edit profile btn
          this.setShowEditButton(true);
          // we return the auth user data that are stored in the store
          return this.store.select(selectUserProfileSettings).pipe(
            // loadEntity will call the callback func if user isn't loaded
            tap(user => loadEntity(user, () => this.store.dispatch(loadUserSettings())))
          );

        } else {
          // it's normal user
          this.setShowEditButton(false);
          this.store.dispatch(loadMember({ id: +memberId }));
          return this.store.select(selectSelectedMember);
        }
      })
    );
  }

  private setShowEditButton(show: boolean) {
    this.showEditBtn = show;
    this.cdr.detectChanges();
  }

}
