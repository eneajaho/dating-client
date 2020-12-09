import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { IQueryParams, PaginatedResult } from "@models/Pagination";
import { Observable } from "rxjs";
import { API_URL } from "@core/configs";
import { User } from "@models/User";
import { map } from "rxjs/operators";
import { MembersFilter } from "@core/models";
import { paramIsCorrect } from "@shared/helpers";

@Injectable({ providedIn: 'root' })
export class MemberService {

  constructor(@Inject(API_URL) private api, private http: HttpClient) { }

  getMembers(queryParams: IQueryParams & MembersFilter): Observable<PaginatedResult<User[]>> {
    let params = new HttpParams()
      .append('PageSize', queryParams.pageSize)
      .append('PageNumber', queryParams.pageNumber);

    if(paramIsCorrect(queryParams.maxAge)) {
      params = params.append('MaxAge', queryParams.maxAge + '')
    }
    if (paramIsCorrect(queryParams.minAge)) {
      params = params.append('MinAge', queryParams.minAge + '')
    }
    if (paramIsCorrect(queryParams.gender)) {
      params = params.append('gender', queryParams.gender)
    }

    const path = `${this.api}/users`;
    return this.http.get<User[]>(path, { observe: 'response', params }).pipe(
      map((res: HttpResponse<any>) => {
        const paginationHeader = res.headers?.get('Pagination');
        const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
        return new PaginatedResult<User[]>(res.body, pagination);
      })
    );
  }

  getMemberDetails(id: number): Observable<User> {
    const path = `${this.api}/users/${id}`;
    return this.http.get<User>(path);
  }

  editMember(user: User): Observable<User> {
    const path = `${this.api}/users/${user.id}`;
    return this.http.put<User>(path, user);
  }

}
