import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../../core/configs/api.token";
import { Login } from "../../../auth/models/Login.model";
import { User } from "../../../auth/models/User.model";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(@Inject(API_URL) private api: string,
              private http: HttpClient) { }

  register(credentials: Login) {
    const path = this.api + 'auth/register';
    return this.http.post<User>(path, credentials);
  }

  login(credentials: Login) {
    const path = this.api + 'auth/login';
    return this.http.post<User>(path, credentials)
  }
}
