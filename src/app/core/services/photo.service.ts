import { Inject, Injectable } from '@angular/core';
import { API_URL } from "@core/configs/api.token";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(@Inject(API_URL) private api, private http: HttpClient) { }

  uploadPhoto(payload, userId: number): Observable<any> {
    const path = `${this.api}users/${userId}/photos`;
    return this.http.post(path, payload);
  }

  setMainPhoto(userId: number, photoId: number) {
    const path = `${this.api}users/${userId}/photos/${photoId}/setMain`;
    return this.http.post(path, {});
  }

  deletePhoto(userId: number, photoId: number): Observable<any> {
    const path = `${this.api}users/${userId}/photos/${photoId}`;
    return this.http.delete(path);
  }

}
