import { Injectable } from "@angular/core";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { MembersPhotoActions } from "@members/store/actions";
import { PhotoService } from "@members/store/services/photo.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class PhotosEffects {
  constructor(private actions$: Actions, private photoService: PhotoService, private toast: ToastrService) {}

  uploadPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersPhotoActions.uploadPhoto),
      switchMap(({ payload, userId }) => {
        return this.photoService.uploadPhoto(payload, userId).pipe(
          map(photo => MembersPhotoActions.uploadPhotoSuccess({ photo, userId })),
          catchError(error => of(MembersPhotoActions.uploadPhotoFailure({ error, userId }))),
        )
      })
    ));

  setMainPhoto$ = createEffect(() => this.actions$.pipe(
    ofType(MembersPhotoActions.setMainPhoto),
    switchMap(({ userId, photoId }) => {
      return this.photoService.setMainPhoto(userId, photoId).pipe(
        map(res => MembersPhotoActions.setMainPhotoSuccess({ userId, photoId })),
        catchError(error => {
          this.toast.warning('', error);
          return of(MembersPhotoActions.setMainPhotoFailure({ userId, error }))
        })
      )
    })
  ))

  deletePhoto$ = createEffect(() => this.actions$.pipe(
    ofType(MembersPhotoActions.deletePhoto),
    switchMap(({ userId, photoId }) => {
      return this.photoService.deletePhoto(userId, photoId).pipe(
        map(res => MembersPhotoActions.deletePhotoSuccess({ userId, photoId })),
        catchError(error => {
          this.toast.warning('', error);
          return of(MembersPhotoActions.deletePhotoFailure({ userId, error }))
        })
      )
    })
  ))

}
