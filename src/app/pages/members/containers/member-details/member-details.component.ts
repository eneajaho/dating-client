import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faUserCog } from '@fortawesome/free-solid-svg-icons';

import { MembersState, selectSelectedMember } from '@members/store/reducers';
import { selectUserDetails, SettingsState } from '@settings/store/reducers';
import { User } from '@models/User';
import { Status } from '@core/models';
import { ActivatedRoute } from '@angular/router';
import { loadAuthDetails } from '@settings/store/actions/settings.actions';
import { loadMember } from '@members/store/actions/member.actions';
import { switchMap, tap } from 'rxjs/operators';
import { loadEntity } from '@shared/helpers';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: [ './member-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailsComponent implements OnInit {

  userDetails$?: Observable<(User & Status) | undefined>;
  isLoggedInUserProfile = false;

  sendIcon = faComment;
  userEditIcon = faUserCog;
  backIcon = faArrowLeft;

  constructor(private store: Store<MembersState & SettingsState>,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.userDetails$ = this.route.params.pipe(
      // gets the memberId from the router
      switchMap(({ memberId }) => {
        if (memberId === 'profile') {
          //  it's authenticated user
          this.isLoggedInUserProfile = true;
          // we return the auth user data that are stored in the store
          return this.store.select(selectUserDetails).pipe(
            // loadEntity will call the callback func if user isn't loaded
            tap(user => loadEntity(user, () => this.store.dispatch(loadAuthDetails())))
          );
        } else {
          // it's normal user
          this.isLoggedInUserProfile = false;
          this.store.dispatch(loadMember({ id: +memberId }));
          return this.store.select(selectSelectedMember);
        }
      })
    );
  }

}
