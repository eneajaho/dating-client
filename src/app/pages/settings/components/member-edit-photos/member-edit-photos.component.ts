import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Photo } from '@core/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromSettings from '@settings/store/reducers';
import { SettingsState } from '@settings/store/reducers';
import { pluck, tap } from 'rxjs/operators';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PhotosActions } from '@settings/store/actions';

@Component({
  selector: 'app-member-edit-photos',
  templateUrl: './member-edit-photos.component.html',
  styleUrls: [ './member-edit-photos.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditPhotosComponent implements OnInit {

  photos$: Observable<Photo[]> = this.store.select(fromSettings.selectUserDetails).pipe(
    tap(user => { this.userId = user.id; }),
    pluck('photos')
  );

  loading$: Observable<boolean> = this.store.select(fromSettings.selectUserDetailsLoading);

  userId = -1;

  checkIcon = faCheck;
  deleteIcon = faTrashAlt;

  constructor(private store: Store<SettingsState>) { }

  ngOnInit(): void { }

  handlePhotos(photos: FileList): void {
    if (!photos?.item(0)?.name) {
      return;
    }
    const formData = new FormData();
    if (photos.item(0) !== null) {
      // @ts-ignore
      formData.append('File', photos.item(0), photos.item(0)?.name);
    }

    this.store.dispatch(PhotosActions.uploadPhoto({ payload: formData, userId: this.userId }));
  }

  setMainPhoto(id: number): void {
    this.store.dispatch(PhotosActions.setMainPhoto({ userId: this.userId, photoId: id }));
  }

  deletePhoto(id: number): void {
    this.store.dispatch(PhotosActions.deletePhoto({ userId: this.userId, photoId: id }));
  }

}
