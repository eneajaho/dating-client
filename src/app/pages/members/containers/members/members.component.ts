import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "@models/User";
import { AppState } from "@root-store/root-state";
import { MembersSelectors } from "@pages/members/members-store";
import { Router } from "@angular/router";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit {

  members$: Observable<User[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.members$ = this.store.select(MembersSelectors.selectMembers);
  }

  goToMember(id: number) {
    this.router.navigate(['/members', id]);
  }
}
