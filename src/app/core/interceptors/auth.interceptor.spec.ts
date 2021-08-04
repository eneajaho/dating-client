import { TestBed } from '@angular/core/testing';
import { AuthInterceptorProvider } from '@core/interceptors/auth.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAuthToken } from '@store/auth';
import { HttpClient } from '@angular/common/http';

describe('Auth Interceptor', () => {
  let store: MockStore;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthInterceptorProvider, provideMockStore() ]
    });

    store = TestBed.inject(MockStore);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should add an Auth header to request if the token is valid(exists)', done => {
    store.overrideSelector(selectAuthToken, 'TestToken');
    store.refreshState();

    httpClient.get('/api').subscribe(() => done());

    const req = httpMock.expectOne('/api');

    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer TestToken');

    req.flush({});
  });

  it('should not add an Auth header if the token is undefined', done => {
    store.overrideSelector(selectAuthToken, undefined);
    store.refreshState();

    httpClient.get('/api').subscribe(() => done());

    const req = httpMock.expectOne('/api');

    expect(req.request.headers.has('Authorization')).toEqual(false);

    req.flush({});
  });

});
