import { Injectable } from '@angular/core';
import { LoginPayload } from '@auth/models';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { AuthService } from '@pages/auth/services/auth.service';
import { loginSuccess } from '@store/auth/auth.actions';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as fromAuth from '@store/auth/auth.reducer';

export interface LoginPageState {
  error: string | null;
  loading: boolean;
}

export const initialState: LoginPageState = {
  error: null,
  loading: false
};

@Injectable()
export class LoginPageStore extends ComponentStore<LoginPageState> {

  constructor(private auth: AuthService, private store: Store<fromAuth.AuthState>) {
    super(initialState);
  }

  readonly login = this.effect((payload$: Observable<LoginPayload>) => payload$.pipe(
    tap(() => this.setState({ loading: true, error: null })),
    switchMap(payload => this.auth.login(payload).pipe(
      tapResponse(
        (user) => {
          this.setLoading(false);
          this.store.dispatch(loginSuccess({ user }));
        },
        (error: string) => { this.setState({ loading: false, error }); }
      ))
    ))
  );

  readonly setLoading = (loading: boolean): void => this.patchState({ loading });
  readonly setError = (error: string | null): void => this.patchState({ error });

}
