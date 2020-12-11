import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faUserCog } from "@fortawesome/free-solid-svg-icons";

import * as fromMembers from '@members/store/reducers';
import * as fromSettings from '@settings/store/reducers';
import * as fromRoot from "@store/reducers";
import { User } from "@models/User";
import { SettingsActions } from "@settings/store/actions";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: [ './member-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailsComponent implements OnInit {

  details$: Observable<User> | undefined;
  myProfile$: Observable<boolean> | undefined;

  sendIcon = faComment;
  userEditIcon = faUserCog;
  backIcon = faArrowLeft;

  constructor(private store: Store<fromMembers.State & fromSettings.State>) { }

  ngOnInit() {
    this.myProfile$ = this.isMyProfilePage$.pipe(
      tap(isMyProfile => {
        if (isMyProfile) {
          this.details$ = this.store.select(fromSettings.selectUserDetails);
        } else {
          // @ts-ignore
          this.details$ = this.store.select(fromMembers.selectSelectedMember);
        }
      })
    );
  }

  private get isMyProfilePage$(): Observable<boolean> {
    return this.store.select(fromRoot.selectRouter).pipe(
      map(data => data?.state?.url === '/members/profile'),
      tap(isMyProfile => {
        if (isMyProfile) {
          this.store.dispatch(SettingsActions.loadAuthDetails());
        }
      })
    )
  }

}
