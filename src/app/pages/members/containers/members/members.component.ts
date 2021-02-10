import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromMembers from '@members/store/reducers';
import { MembersState } from '@members/store/reducers';
import { MembersPageActions } from '@members/store/actions';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: [ './members.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent {

  vm$ = combineLatest([
    this.store.select(fromMembers.selectAllMembers),
    this.store.select(fromMembers.selectMembersLoading),
    this.store.select(fromMembers.selectMembersError)
  ]).pipe(map(([ members, loading, error ]) => ({
    members, error, loading,
    noMembersFound: members.length === 0 && !loading && !error
  })));

  pagination$ = this.store.select(fromMembers.selectMembersPagination);
  hasMorePages$ = this.store.select(fromMembers.selectMembersHasMorePages);

  filterIcon = faFilter;

  constructor(private store: Store<MembersState>) {}

  loadMore(): void {
    this.store.dispatch(MembersPageActions.loadMoreMembers());
  }

  retry(): void {
    this.store.dispatch(MembersPageActions.loadMembers({}));
  }


}
