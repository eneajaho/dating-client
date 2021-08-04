import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ErrorInterceptorProvider } from './error.interceptor';

describe('Error Interceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  const url = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      // providers: [ ErrorInterceptorProvider ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Assert that there are no outstanding requests.
  afterEach(() => httpMock.verify());

  it('should not throw error if no error is emitted', () => {
    httpClient.get(url).subscribe({
      next: res => expect(res).toBe(1),
      error: err => expect(err).toBeFalsy()
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');

    req.flush(1);
  });

  /** Any error returned on the Observable response stream
   * will be wrapped in an HttpErrorResponse to provide additional
   * context about the state of the HTTP layer when the error occurred.
   * The error property will contain either a wrapped Error object
   * or the error response returned from the server.
   */
  // describe('with error that is instanceof HttpErrorResponse', () => {
  //
  //   describe('with error status: 0', () => {
  //     it('and statusText: \'Unknown Error\' should throw \'Server is not responding!\'', done => {
  //       httpClient.get('/api').subscribe(x => {
  //         },
  //         err => {
  //           expect(err).toBe('Server is not responding!');
  //           done();
  //         });
  //
  //       const req = httpMock.expectOne('/api');
  //
  //       req.error(new ErrorEvent('HttpErrorResponse'), { status: 0, statusText: 'Unknown Error' });
  //     });
  //
  //     it('should dispatch logout action and throw statusText of the error', done => {
  //       httpClient.get('/api').subscribe(x => {
  //         },
  //         err => {
  //           expect(err).toBe('ErrorMessage');
  //           done();
  //         });
  //
  //       const req = httpMock.expectOne('/api');
  //
  //       req.flush('Error!!!', { status: 0, statusText: 'ErrorMessage' });
  //
  //       // const expected = cold('a', { a: logout() });
  //       // expect(store.scannedActions$).toBeObservable(expected);
  //     });
  //   });
  //
  //   describe('with error status: 401', () => {
  //     it('and statusText: \'Unauthorized\' should throw \'You are not authorized!\' and dispatch logout action', done => {
  //       httpClient.get('/api').subscribe(x => {
  //         },
  //         err => {
  //           expect(err).toBe('You are not authorized!');
  //           done();
  //         });
  //
  //       const req = httpMock.expectOne('/api');
  //
  //       req.flush('Error!!!', { status: 401, statusText: 'Unauthorized' });
  //
  //       // const expected = cold('a', { a: logout() });
  //       // expect(store.scannedActions$).toBeObservable(expected);
  //     });
  //
  //     it('should throw statusText of the error', done => {
  //       httpClient.get('/api').subscribe(
  //         x => {
  //         },
  //         err => {
  //           expect(err).toBe('ErrorMessage');
  //           done();
  //         }
  //       );
  //
  //       const req = httpMock.expectOne('/api');
  //
  //       req.flush('Error!!!', { status: 401, statusText: 'ErrorMessage' });
  //     });
  //   });
  //
  //   it('with error status: 500, should throw body of the error', done => {
  //     httpClient.get('/api').subscribe(x => {
  //       },
  //       err => {
  //         expect(err).toBe('Internal Server Error.');
  //         done();
  //       });
  //
  //     const req = httpMock.expectOne('/api');
  //
  //     req.flush('Internal Server Error.', { status: 500, statusText: 'test' });
  //   });
  //
  //   it('and has \'Application-Error\' header should throw header error', done => {
  //     httpClient.get('/api').subscribe(
  //       x => {
  //       },
  //       err => {
  //         expect(err).toBe('ErrorMessage!');
  //         done();
  //       }
  //     );
  //
  //     const req = httpMock.expectOne('/api');
  //
  //     req.flush('Error!!!', {
  //       status: 405,
  //       statusText: 'ErrorStatusText',
  //       headers: { 'Application-Error': 'ErrorMessage!' }
  //     });
  //   });
  //
  //   it('with error status: 400, should throw model state error', done => {
  //     const serverError = {
  //       errors: {
  //         username: [ 'Username cannot be longer than 20 characters.' ],
  //         password: [ 'Password cannot be shorter than 8 characters.' ]
  //       }
  //     };
  //     const { errors } = serverError;
  //
  //     httpClient.get('/api').subscribe(x => {
  //       },
  //       err => {
  //         let modelStateErrors = '';
  //         if (typeof errors === 'object') {
  //           for (const key in errors) {
  //             // @ts-ignore
  //             modelStateErrors += errors[key] + '\n';
  //           }
  //         }
  //         expect(err).toBe(modelStateErrors);
  //         done();
  //       });
  //
  //     const req = httpMock.expectOne('/api');
  //
  //     req.flush(serverError, {
  //       status: 400,
  //       statusText: 'ErrorStatusText',
  //     });
  //   });
  //
  // });

});
