import { Inject, Injectable } from '@angular/core';
import { API_URL } from "@core/configs/api.token";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "@models/User";

@Injectable({ providedIn: 'root' })
export class MemberService {

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) { }

  getMembers(): Observable<User[]> {
    // const path = this.api + 'users?pageNumber=1&pageSize=6';
    const path = this.api + 'users';
    return this.http.get<User[]>(path);
  }

  getMemberDetails(id: number): Observable<User> {
    const path = this.api + 'users/' + id;
    return this.http.get<User>(path);
  }

  editMember(user: User): Observable<User> {
    const path = this.api + 'users/' + user.id;
    return this.http.put<User>(path, user);
  }

}
