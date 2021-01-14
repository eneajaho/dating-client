import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL } from '@core/tokens';
import { AuthService } from '@auth/services/auth.service';
import { Credentials, LoginResponse, Register } from '@auth/models';

describe('Auth Service', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let apiUrl: string = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: API_URL, useValue: apiUrl },
        AuthService
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });


  describe('register method', () => {
    let credentials: Register = {
      username: 'test', birthday: new Date(),
      city: 'T', country: 'T', gender: 'Male',
      knownAs: 'T', password: 'TTTTT'
    };

    it('should return Observable<unknown>', () => {
      authService.register(credentials).subscribe(res => {
        expect(res).toBe({});
      });

      const path = `${ apiUrl }/auth/register`;

      const req = httpMock.expectOne(path);
      expect(req.request.url).toBe(path);
      expect(req.request.method).toEqual('POST');

      req.flush({});
    });
  })

  describe('login method', () => {
    let credentials: Credentials = { username: 'test',  password: 'TTTTT' };
    let response: LoginResponse = { id: 1, name: 't', token: 't' }
    it('should return Observable<LoginResponse>', () => {
      authService.login(credentials).subscribe(res => {
        expect(res).toBe(response);
      });

      const path = `${ apiUrl }/auth/login`;

      const req = httpMock.expectOne(path);
      expect(req.request.url).toBe(path);
      expect(req.request.method).toEqual('POST');

      req.flush(response);
    });
  })


});
