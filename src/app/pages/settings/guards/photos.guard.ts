import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { map } from 'rxjs/operators';
import { selectUserPhotosState, SettingsState } from '@settings/store/reducers';
import { loadEntity } from '@shared/helpers';
import { loadUserProfilePhotos } from '@settings/store/actions/photos.actions';

@Injectable()
export class PhotosGuard implements CanActivate {

  constructor(private store: Store<SettingsState>) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(selectUserPhotosState).pipe(
      map((userPhotos) => {
        loadEntity(userPhotos, () => this.store.dispatch(loadUserProfilePhotos()))
        return true;
      })
    );
  }

}
