import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "@models/User";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit {

  members$: Observable<User[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.members$ = this.store.select(MembersSelectors.selectMembers);
  }

}
