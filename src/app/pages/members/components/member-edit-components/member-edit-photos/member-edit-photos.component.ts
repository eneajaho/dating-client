import { Component, OnInit } from '@angular/core';
import { Photo } from "@core/models";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromMembers from "@members/store/reducers";
import { map, tap } from "rxjs/operators";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { MembersPhotoActions } from "@members/store/actions";

@Component({
  selector: 'app-member-edit-photos',
  templateUrl: './member-edit-photos.component.html',
  styleUrls: [ './member-edit-photos.component.scss' ]
})
export class MemberEditPhotosComponent implements OnInit {

  photos$: Observable<Photo[]>;
  loading$: Observable<boolean>;
  userId: number;

  checkIcon = faCheck;
  deleteIcon = faTrashAlt;

  constructor(private store: Store<fromMembers.State>) {}

  ngOnInit() {
    this.photos$ = this.store.select(fromMembers.selectSelectedMember).pipe(
      tap(user => { this.userId = user.id }),
      map(user => user.photos)
    );

    this.loading$ = this.store.select(fromMembers.selectMemberLoading);
  }

  handlePhotos(photos: FileList) {
    const formData = new FormData();
    formData.append('File', photos.item(0), photos.item(0).name);

    this.store.dispatch(MembersPhotoActions.uploadPhoto({ payload: formData, userId: this.userId }))
  }

}
