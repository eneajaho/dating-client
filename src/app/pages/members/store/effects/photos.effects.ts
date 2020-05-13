import { Injectable } from "@angular/core";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { MembersPhotoActions } from "@members/store/actions";
import { PhotoService } from "@members/store/services/photo.service";

@Injectable()
export class PhotosEffects {
  constructor(private actions$: Actions, private photoService: PhotoService) {}

  loadMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MembersPhotoActions.uploadPhoto),
      switchMap(({ payload, userId }) => {
        return this.photoService.uploadPhoto(payload, userId).pipe(
          map(photo => MembersPhotoActions.uploadPhotoSuccess({ photo, userId })),
          catchError(error => of(MembersPhotoActions.uploadPhotoFailure({ error, userId }))),
        )
      })
    ));

}
