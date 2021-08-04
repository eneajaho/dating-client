import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@core/tokens';
import { Observable } from 'rxjs';
import { LoginPayload, AuthUser, RegisterUserPayload } from '@auth/models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) { }

  register(payload: RegisterUserPayload): Observable<AuthUser> {
    const path = `${this.api}/auth/register`;
    return this.http.post<AuthUser>(path, payload);
  }

  login(payload: LoginPayload): Observable<AuthUser> {
    const path = `${this.api}/auth/login`;
    return this.http.post<AuthUser>(path, payload);
  }

}
