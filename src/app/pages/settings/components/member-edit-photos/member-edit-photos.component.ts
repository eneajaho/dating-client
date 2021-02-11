import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserPhotosState, SettingsState } from '@settings/store/reducers';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deletePhoto, setMainPhoto, uploadPhoto } from '@settings/store/actions/photos.actions';

@Component({
  selector: 'app-member-edit-photos',
  templateUrl: './member-edit-photos.component.html',
  styleUrls: [ './member-edit-photos.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditPhotosComponent implements OnInit {

  vm$ = this.store.select(selectUserPhotosState);

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

    this.store.dispatch(uploadPhoto({ payload: formData }));
  }

  setMainPhoto(id: number): void {
    this.store.dispatch(setMainPhoto({ photoId: id }));
  }

  deletePhoto(id: number): void {
    this.store.dispatch(deletePhoto({ photoId: id }));
  }

}
