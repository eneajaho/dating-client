import { Injectable } from '@angular/core';
import { selectAuthenticatedUserId } from '@auth/store/reducers';
import { PhotoService } from '@core/services/photo.service';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  deletePhoto,
  deletePhotoFailure,
  deletePhotoSuccess,
  loadUserProfilePhotos,
  loadUserProfilePhotosFailure,
  loadUserProfilePhotosSuccess,
  setMainPhoto,
  setMainPhotoFailure,
  setMainPhotoSuccess,
  uploadPhoto,
  uploadPhotoFailure,
  uploadPhotoSuccess
} from '@settings/store/actions/photos.actions';
import { changeUserImageLocally } from '@settings/store/actions/settings.actions';
import { selectUserPhotosState, SettingsState } from '@settings/store/reducers';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';



@Injectable()
export class PhotosEffects {
  constructor(
    private actions$: Actions,
    private store: Store<SettingsState>,
    private photoService: PhotoService,
    private toast: ToastrService
  ) { }

  LoadUserPhoto$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserProfilePhotos),
    concatLatestFrom(() => this.store.select(selectAuthenticatedUserId)),
    switchMap(([action, id]) => {
      return this.photoService.getUserPhotos(id).pipe(
        map(photos => loadUserProfilePhotosSuccess({ photos })),
        catchError(error => of(loadUserProfilePhotosFailure({ error }))),
      );
    })
  ));

  UploadPhoto$ = createEffect(() => this.actions$.pipe(
    ofType(uploadPhoto),
    concatLatestFrom(() => this.store.select(selectAuthenticatedUserId)),
    switchMap(([{ payload }, userId]) => {
      return this.photoService.uploadPhoto(payload, userId).pipe(
        map(photo => uploadPhotoSuccess({ photo })),
        catchError(error => of(uploadPhotoFailure({ error }))),
      );
    })
  ));

  SetMainPhoto$ = createEffect(() => this.actions$.pipe(
    ofType(setMainPhoto),
    concatLatestFrom(() => this.store.select(selectAuthenticatedUserId)),
    switchMap(([{ photoId }, userId]) => {
      return this.photoService.setMainPhoto(userId, photoId).pipe(
        map(() => {
          return setMainPhotoSuccess({ photoId });
        }),
        catchError(error => {
          this.toast.warning(error);
          return of(setMainPhotoFailure({ error }));
        })
      );
    })
  ));

  ChangeUserImageLocally$ = createEffect(() => this.actions$.pipe(
    ofType(setMainPhotoSuccess),
    concatLatestFrom(() => this.store.select(selectUserPhotosState)),
    switchMap(([action, photosState]) => {
      const photoUrl = photosState.photos.find(p => p.isMain)?.url ?? '';
      return of(changeUserImageLocally({ photoUrl }));
    })
  ));

  DeletePhoto$ = createEffect(() => this.actions$.pipe(
    ofType(deletePhoto),
    concatLatestFrom(() => this.store.select(selectAuthenticatedUserId)),
    switchMap(([{ photoId }, userId]) => {
      return this.photoService.deletePhoto(userId, photoId).pipe(
        map(() => deletePhotoSuccess({ photoId })),
        catchError(error => {
          this.toast.warning(error);
          return of(deletePhotoFailure({ error }));
        })
      );
    })
  ));

}
