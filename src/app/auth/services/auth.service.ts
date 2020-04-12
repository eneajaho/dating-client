import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Login } from "../models/Login.model";
import { User } from "../models/User.model";
import { API_URL } from "../../configs/api.token";

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
    return this.http.post<User>(path, credentials);
  }
}
