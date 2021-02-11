import { Injectable } from '@angular/core';
import { catchError, concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PhotoService } from '@core/services/photo.service';
import { ToastrService } from 'ngx-toastr';
import { PhotosActions } from '@settings/store/actions';
import { selectUserProfileSettings, SettingsState } from '@settings/store/reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class PhotosEffects {
  constructor(private actions$: Actions,
              private store: Store<SettingsState>,
              private photoService: PhotoService,
              private toast: ToastrService) {
  }

  UploadPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosActions.uploadPhoto),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.select(selectUserProfileSettings)))
      ),
      switchMap(([ { payload }, { id: userId } ]) => {
        return this.photoService.uploadPhoto(payload, userId).pipe(
          map(photo => PhotosActions.uploadPhotoSuccess({ photo })),
          catchError(error => of(PhotosActions.uploadPhotoFailure({ error }))),
        );
      })
    ));

  SetMainPhoto$ = createEffect(() => this.actions$.pipe(
    ofType(PhotosActions.setMainPhoto),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.select(selectUserProfileSettings)))
    ),
    switchMap(([ { photoId }, { id: userId } ]) => {
      return this.photoService.setMainPhoto(userId, photoId).pipe(
        map(() => PhotosActions.setMainPhotoSuccess({ photoId })),
        catchError(error => {
          this.toast.warning(error);
          return of(PhotosActions.setMainPhotoFailure({ error }));
        })
      );
    })
  ));

  DeletePhoto$ = createEffect(() => this.actions$.pipe(
    ofType(PhotosActions.deletePhoto),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.select(selectUserProfileSettings)))
    ),
    switchMap(([ { photoId }, { id: userId } ]) => {
      return this.photoService.deletePhoto(userId, photoId).pipe(
        map(() => PhotosActions.deletePhotoSuccess({ photoId })),
        catchError(error => {
          this.toast.warning(error);
          return of(PhotosActions.deletePhotoFailure({ error }));
        })
      );
    })
  ));

}
