import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "@core/configs";
import { User } from "@models/User";
import { IQueryParams, PaginatedResult } from "@models/Pagination";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class MemberService {

  constructor(@Inject(API_URL) private api, private http: HttpClient) { }

  getMembers({ pageSize, pageNumber }: IQueryParams): Observable<PaginatedResult<User[]>> {

    const params = new HttpParams()
      .append('PageSize', pageSize)
      .append('PageNumber', pageNumber);

    const path = this.api + 'users';
    return this.http.get<User[]>(path, { observe: 'response', params }).pipe(
      map((res: HttpResponse<any>) => {
        const paginationHeader = res.headers?.get('Pagination');
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
        return new PaginatedResult<User[]>(res.body, pagination);
      })
    );
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
