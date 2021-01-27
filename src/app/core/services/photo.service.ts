import { Inject, Injectable } from '@angular/core';
import { API_URL } from '@core/tokens';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '@core/models';

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(@Inject(API_URL) private api: string, private http: HttpClient) { }

  uploadPhoto(payload: any, userId: number): Observable<Photo> {
    const path = `${this.api}/users/${userId}/photos`;
    return this.http.post<Photo>(path, payload);
  }

  setMainPhoto(userId: number, photoId: number): Observable<void> {
    const path = `${this.api}/users/${userId}/photos/${photoId}/setMain`;
    return this.http.post<void>(path, {});
  }

  deletePhoto(userId: number, photoId: number): Observable<void> {
    const path = `${this.api}/users/${userId}/photos/${photoId}`;
    return this.http.delete<void>(path);
  }

}
