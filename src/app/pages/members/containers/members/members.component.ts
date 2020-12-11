import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "@models/User";

import * as fromMembers from '@members/store/reducers';
import { Status } from "@core/models";
import { MembersPageActions } from "@members/store/actions";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: [ './members.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit {

  members$: Observable<(User & Status)[]> = this.store.select(fromMembers.selectAllMembers);
  loading$ = this.store.select(fromMembers.selectMembersLoading);
  error$ = this.store.select(fromMembers.selectMembersError);

  pagination$ = this.store.select(fromMembers.selectMembersPagination);
  hasMorePages$ = this.store.select(fromMembers.selectMembersHasMorePages);
  /*
  // if we want to combine multiple obs$ in one
  // so we can have only one async pipe
  pagination$ = combineLatest([
    this.store.select(fromMembers.selectMembersPagination),
    this.store.select(fromMembers.selectMembersHasMorePages)
  ]).pipe(map(([ pagination, hasMorePages ]) =>
    ({ ...pagination, hasMorePages })
  ));*/

  constructor(private store: Store<fromMembers.State>) {}

  ngOnInit(): void { }

  loadMore(): void {
    this.store.dispatch(MembersPageActions.loadMoreMembers());
  }

  retry(): void {
    this.store.dispatch(MembersPageActions.loadMembers({}));
  }


}
