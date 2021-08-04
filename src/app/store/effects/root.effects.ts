import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { LocalStorageService } from '@core/services/local-storage.service';
import { getUserLocal } from '@store/auth/auth.actions';

@Injectable()
export class RootEffects {

  constructor(private actions$: Actions, private local: LocalStorageService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(ofType(ROOT_EFFECTS_INIT), switchMap(() => {
      const localUser = this.local.get('user');
      const user = localUser ? JSON.parse(localUser) : null;
      return of(getUserLocal({ user }));
    }))
  );
}
