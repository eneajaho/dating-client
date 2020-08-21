import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "@models/User";

import * as fromMembers from '@members/store/reducers';
import { Status } from "@members/store/reducers/members.reducers";
import { LayoutService } from "@layout/services/layout.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit {

  members$: Observable<(User & Status)[]>;

  constructor(private store: Store<fromMembers.State>, private layout: LayoutService) { }

  ngOnInit() {
    this.members$ = this.store.select(fromMembers.selectAllMembers);
    // this.layout.light();
  }

}
