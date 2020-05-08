import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "@models/User";

import * as fromMembers from '@members/store/reducers';
import { Status } from "@members/store/reducers/members.reducers";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit {

  members$: Observable<(User & Status)[]>;

  constructor(private store: Store<fromMembers.State>) { }

  ngOnInit() {
    this.members$ = this.store.select(fromMembers.selectAllMembers);
  }

}
