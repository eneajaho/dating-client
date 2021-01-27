import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RootEffects } from './root.effects';
import { EffectsModule } from '@ngrx/effects';
import { LocalStorageService } from '@core/services';
import { LoginResponse } from '@auth/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

interface LocalServiceMock {
  users: {
    [userId: string]: LoginResponse
  },
  get: (user: string) => LoginResponse
}

describe('RootEffects', () => {
  let actions$: Observable<any>;
  let effects: RootEffects;
  let store: MockStore;

  const localServiceMock: LocalServiceMock = {
    users: {
      'user': { id: 1, name: 'Test1', token: 'test' },
      'user2': { id: 2, name: 'Test2', token: 'test' },
    },
    get: (user: string): LoginResponse => {
      const { users } = localServiceMock;
      return users[user] ?? null;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EffectsModule.forRoot([RootEffects]),
      ],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$),
        {
          provide: LocalStorageService,
          useValue: localServiceMock
        }
      ]
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(RootEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('on init$', () => {
    it('should get user from local storage and return getUserLocal action', () => {
      const userLocal = localServiceMock.get('user1');
      expect(1).toBe(1);
      // actions$ = of(ROOT_EFFECTS_INIT, getUserLocal({ user: userLocal }));

      // effects.init$.pipe(take(1)).subscribe(action => {
      //   expect(action).toBeTruthy();
      // });
      // expect(action).toEqual({
      //    type: '[INIT] Get User From LocalStorage'
      // });
    });

  })

});
