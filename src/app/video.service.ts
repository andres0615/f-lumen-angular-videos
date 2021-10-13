import { Injectable } from '@angular/core';
import { Video } from './video';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private videosUrl = environment.apiUrl + '/video'; // URL to web api

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videosUrl);
  }

  getVideosByUserId(userId: number): Observable<Video[]> {
    return this.http.get<Video[]>(this.videosUrl + '/user/' + userId);
  }

  getVideo(id: number): Observable<Video> {
    const url = `${this.videosUrl}/${id}`;

    return this.http.get<Video>(url);
  }
}
