import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { User } from "@models/User";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";

import * as fromMembers from '@members/store/reducers';
import * as fromRoot from '@store/reducers';
import { map, takeUntil, tap } from "rxjs/operators";
import { MemberActions } from "@members/store/actions";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: [ './member-edit.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditComponent implements OnInit {

  details$: Observable<User>;
  page$: Observable<string>;

  constructor(private store: Store<fromMembers.State>) { }

  ngOnInit() {
    this.details$ = this.store.select(fromMembers.selectSelectedMember);

    this.page$ = this.store.select(fromRoot.selectRouter)
      .pipe(map(data => this.getPage(data)));
  }

  getPage(routerState) {
    if (!routerState) { return null; }
    const url = routerState.state.url;
    const tags = url.split('/');
    if (tags[3] !== null && tags[3] !== '' && tags[3] !== undefined) {
      return tags[3];
    }
  }
}
