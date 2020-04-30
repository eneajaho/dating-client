import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "@root-store/root-state";
import { Observable } from "rxjs";
import { User } from "@models/User";
import { selectSelectedMember } from "@pages/members/members-store/selectors/members.selectors";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  details$: Observable<User>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.details$ = this.store.select(selectSelectedMember);
  }

}
