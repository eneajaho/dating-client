import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from "@core/configs/api.token";
import { Observable } from 'rxjs';
import { Credentials, LoginResponse } from "@auth/models";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) { }

  register(credentials: Credentials) {
    const path = this.api + 'auth/register';
    return this.http.post<LoginResponse>(path, credentials);
  }

  login(credentials: Credentials): Observable<LoginResponse> {
    const path = this.api + 'auth/login';
    return this.http.post<LoginResponse>(path, credentials)
  }
}
