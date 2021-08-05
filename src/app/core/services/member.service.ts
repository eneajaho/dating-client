import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { IQueryParams, PaginatedResult } from '@models/Pagination';
import { Observable } from 'rxjs';
import { API_URL } from '@core/tokens';
import { User } from '@models/User';
import { map } from 'rxjs/operators';
import { MembersFilter } from '@core/models';

@Injectable({ providedIn: 'root' })
export class MemberService {

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) { }

  getMembers(filters: Partial<IQueryParams & MembersFilter>): Observable<PaginatedResult<User[]>> {
    const params = this.createParamsFromFilter(filters);
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
    const path = `${this.api}/users/${user.username}`;
    return this.http.put<User>(path, user);
  }

  createParamsFromFilter(filters: Partial<IQueryParams & MembersFilter>): HttpParams {
    let params = new HttpParams();

    for (const [key, value] of Object.entries(filters).sort()) {
      if (value !== undefined && value !== ''  && value !== null) {
        const capitalizedParamKey = this.capitalizeFirstLetter(key);
        params = params.append(capitalizedParamKey, value + '');
      }
    }

    return params;
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

}
