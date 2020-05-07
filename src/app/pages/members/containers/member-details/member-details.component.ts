import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { User } from "@models/User";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: [ './member-details.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberDetailsComponent implements OnInit {

  details$: Observable<User>;
  user$: Observable<User>;

  isMyProfile$: Observable<boolean>;

  sendIcon = faComment;
  userEditIcon = faUserCog;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.details$ = this.store.select(selectSelectedMember);
    this.user$ = this.store.select(selectAuthUser);

    this.isMyProfile$ =
      this.details$.pipe(switchMap(details =>
        this.user$.pipe(map(auth => details?.id === auth?.id))));
  }

}
