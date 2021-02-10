import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PhotoService } from '@core/services/photo.service';
import { ToastrService } from 'ngx-toastr';
import { PhotosActions } from '@settings/store/actions';

@Injectable()
export class PhotosEffects {
  constructor(private actions$: Actions, private photoService: PhotoService, private toast: ToastrService) {}

  UploadPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosActions.uploadPhoto),
      switchMap(({ payload, userId }) => {
        return this.photoService.uploadPhoto(payload, userId).pipe(
          map(photo => PhotosActions.uploadPhotoSuccess({ photo })),
          catchError(error => of(PhotosActions.uploadPhotoFailure({ error }))),
        );
      })
    ));

  SetMainPhoto$ = createEffect(() => this.actions$.pipe(
    ofType(PhotosActions.setMainPhoto),
    switchMap(({ userId, photoId }) => {
      return this.photoService.setMainPhoto(userId, photoId).pipe(
        map(() => PhotosActions.setMainPhotoSuccess({ photoId })),
        catchError(error => {
          this.toast.warning('', error);
          return of(PhotosActions.setMainPhotoFailure({ error }));
        })
      );
    })
  ));

  DeletePhoto$ = createEffect(() => this.actions$.pipe(
    ofType(PhotosActions.deletePhoto),
    switchMap(({ userId, photoId }) => {
      return this.photoService.deletePhoto(userId, photoId).pipe(
        map(() => PhotosActions.deletePhotoSuccess({ photoId })),
        catchError(error => {
          this.toast.warning('', error);
          return of(PhotosActions.deletePhotoFailure({ error }));
        })
      );
    })
  ));

}
