import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "@models/User";
import * as MembersActions from '../../members-store/actions/members.actions';
import { AppState } from "@root-store/root-state";
import { selectMembers } from "@pages/members/members-store/selectors/members.selectors";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
})
export class MembersComponent implements OnInit {

  members$: Observable<User[]> = this.store.select(selectMembers);

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(MembersActions.LOAD_MEMBERS());
  }

}
