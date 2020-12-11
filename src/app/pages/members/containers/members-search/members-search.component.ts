import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { THEME, ThemeProvider } from "@core/tokens/theme.token";
import { Store } from "@ngrx/store";
import * as fromMembers from '@members/store/reducers';
import { MembersPageActions } from "@members/store/actions";

@Component({
  selector: 'app-members-search',
  templateUrl: './members-search.component.html',
  styleUrls: ['./members-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersSearchComponent {

  activeFilters$ = this.store.select(fromMembers.selectMembersFilters);

  constructor(@Inject(THEME) public theme$: ThemeProvider,
              private store: Store<fromMembers.State>) { }

  handleSubmit(filters) {
    this.store.dispatch(MembersPageActions.setMembersFilter({ filters }));
  }

}
