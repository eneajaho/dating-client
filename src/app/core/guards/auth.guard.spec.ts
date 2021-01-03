import { TestBed } from '@angular/core/testing';

import { cold } from "jest-marbles";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { AuthGuard } from "./auth.guard";
import { selectLoggedIn } from "@auth/store/reducers";
import { authRedirect } from "@auth/store/actions/auth.actions";

describe('TestGuardGuard', () => {
  let guard: AuthGuard;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        provideMockStore()
      ]
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false if the user is not logged in', done => {
    store.overrideSelector(selectLoggedIn, false);
    store.refreshState();

    guard.canActivate().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(false);
      done();
    });
  });

  it('should dispatch authRedirect action if the user is not logged in', done => {
    store.overrideSelector(selectLoggedIn, false);
    store.refreshState();

    guard.canActivate().subscribe(() => done());

    let expected = cold('a', { a: authRedirect() })
    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should return true if the user is logged in', done => {
    store.overrideSelector(selectLoggedIn, true);
    store.refreshState();

    guard.canActivate().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(true);
      done();
    });
  });

});
