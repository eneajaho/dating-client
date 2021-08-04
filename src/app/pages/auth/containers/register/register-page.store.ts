import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { AuthService } from '@pages/auth/services/auth.service';
import { registerUserSuccess } from '@store/auth/auth.actions';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { RegisterUserPayload } from './../../models/RegisterUserPayload';
import * as fromAuth from '@store/auth/auth.reducer';

export interface RegisterPageState {
  error: string | null;
  loading: boolean;
}

export const initialState: RegisterPageState = {
  error: null,
  loading: false
};

@Injectable()
export class RegisterPageStore extends ComponentStore<RegisterPageState> {

  constructor(private auth: AuthService, private store: Store<fromAuth.AuthState>) {
    super(initialState);
  }

  readonly register = this.effect((payload$: Observable<RegisterUserPayload>) => payload$.pipe(
    tap(() => this.setState({ loading: true, error: null })),
    switchMap(payload => this.auth.register(payload).pipe(
      tapResponse(
        (user) => {
          this.setLoading(false);
          this.store.dispatch(registerUserSuccess({ user }));
        },
        (error: string) => { this.setState({ loading: false, error }); }
      ))
    ))
  );

  readonly setLoading = (loading: boolean): void => this.patchState({ loading });
  readonly setError = (error: string | null): void => this.patchState({ error });

}
