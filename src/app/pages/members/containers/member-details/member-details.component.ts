import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { User } from "@models/User";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";

import * as fromMembers from '@members/store/reducers';
import * as fromAuth from '@auth/store/reducers';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: [ './member-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailsComponent implements OnInit {

  details$: Observable<User>;
  userId$: Observable<any>;

  isMyProfile$: Observable<boolean>;

  sendIcon = faComment;
  userEditIcon = faUserCog;

  constructor(private store: Store<fromMembers.State>) { }

  ngOnInit(): void {
    this.details$ = this.store.select(fromMembers.selectSelectedMember);
    this.userId$ = this.store.select(fromAuth.selectUserId);

    this.isMyProfile$ =
      this.details$.pipe(switchMap(details =>
        this.userId$.pipe(map(userId => details?.id === userId))));
  }

}
