import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "@models/User";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";


@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  details$: Observable<User>;
  user$: Observable<User>;

  sendIcon = faComment;
  userEditIcon = faUserCog;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.details$ = this.store.select(selectMyProfile);
  }


}
