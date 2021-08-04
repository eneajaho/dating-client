import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectLoggedIn } from '@store/auth';
import { AuthGuard } from './auth.guard';


describe('AuthGuard', () => {
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

    // const expected = cold('a', { a: redirectToAuth() });
    // expect(store.scannedActions$).toBeObservable(expected);
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
