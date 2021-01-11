import { TestBed } from '@angular/core/testing';

import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { selectLoggedIn } from "@auth/store/reducers";
import { NonAuthGuard } from "./non-auth.guard";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

describe('NonAuth Guard', () => {
  let guard: NonAuthGuard;
  let store: MockStore;

  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        NonAuthGuard,
        provideMockStore(),
      ]
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(NonAuthGuard);
    router = TestBed.inject(Router);
  });

  it('should return true if the user is not logged in', done => {
    store.overrideSelector(selectLoggedIn, false);
    store.refreshState();

    guard.canActivate().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(true);
      done();
    });
  });

  it('should navigate to \'/\' if the user is logged in', done => {
    store.overrideSelector(selectLoggedIn, true);
    store.refreshState();

    const navigateSpy = spyOn(router, 'navigateByUrl');

    guard.canActivate().subscribe(() => done());

    expect(navigateSpy).toHaveBeenCalledWith('/');
  });

  it('should return false if the user is logged in', done => {
    store.overrideSelector(selectLoggedIn, true);
    store.refreshState();

    guard.canActivate().subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(false);
      done();
    });
  });

});
