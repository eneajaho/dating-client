import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { IQueryParams, PaginatedResult } from "@models/Pagination";
import { Observable } from "rxjs";
import { API_URL } from "@core/tokens";
import { User } from "@models/User";
import { map } from "rxjs/operators";
import { MembersFilter } from "@core/models";

@Injectable({ providedIn: 'root' })
export class MemberService {

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) { }

  getMembers(filters: Partial<IQueryParams & MembersFilter>): Observable<PaginatedResult<User[]>> {
    let params = new HttpParams();

    if(filters.pageSize !== undefined ) {
      params = params.append('PageSize', filters.pageSize);
    }
    if(filters.pageNumber !== undefined ) {
      params = params.append('PageNumber', filters.pageNumber);
    }
    if(filters.maxAge !== undefined) {
      params = params.append('MaxAge', filters.maxAge + '')
    }
    if (filters.minAge !== undefined) {
      params = params.append('MinAge', filters.minAge + '')
    }
    if (filters.gender !== undefined) {
      params = params.append('gender', <string>filters.gender)
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

  getMemberDetails(id?: number): Observable<User> {
    const path = `${this.api}/users/${id}`;
    return this.http.get<User>(path);
  }

  editMember(user: User): Observable<User> {
    const path = `${this.api}/users/${user.id}`;
    return this.http.put<User>(path, user);
  }

}
