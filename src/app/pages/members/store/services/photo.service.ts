import { Inject, Injectable } from '@angular/core';
import { API_URL } from "@core/configs/api.token";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) { }

  uploadPhoto(payload, userId: number): Observable<any> {
    const path = `${this.api}users/${userId}/photos`;
    return this.http.post(path, payload);
  }

  deletePhoto(id: number): Observable<boolean> {
    return of(true)
  }

}
