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
  styleUrls: ['./members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit {

  members$: Observable<(User & Status)[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  paginationHasMorePages$: Observable<boolean>;
  paginationLoading$: Observable<boolean>;
  paginationError$: Observable<string>;

  constructor(private store: Store<fromMembers.State>) { }

  ngOnInit() {
    this.members$ = this.store.select(fromMembers.selectAllMembers);
    this.loading$ = this.store.select(fromMembers.selectMembersLoading);
    this.error$ = this.store.select(fromMembers.selectMembersError);

    this.paginationHasMorePages$ = this.store.select(fromMembers.selectMembersHasMorePages);
    this.paginationLoading$ = this.store.select(fromMembers.selectMembersPaginationLoading);
    this.paginationError$ = this.store.select(fromMembers.selectMembersPaginationError);
  }

  loadMore() {
    this.store.dispatch(MembersPageActions.loadMoreMembers());
  }


}
