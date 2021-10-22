import { Injectable } from '@angular/core';
import { Video } from './video';
import { Observable, of, from, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private videosUrl = environment.apiUrl + '/video'; // URL to web api
  public keywordSearch: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  httpOptions = {
    headers: new HttpHeaders({
      contentType: 'multipart/form-data',
      accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videosUrl);
  }

  getVideosByUserId(
    userId: number,
    withVideoUrl: boolean = false
  ): Observable<Video[]> {
    const url = this.videosUrl + '/user/' + userId + '/' + withVideoUrl;

    return this.http.get<Video[]>(url);
  }

  getVideo(id: number): Observable<Video> {
    const url = `${this.videosUrl}/${id}`;

    return this.http.get<Video>(url);
  }

  updateVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.videosUrl + '/' + video.id, video);
  }

  storeVideo(video: Video, videoFile?: File): Observable<Video> {
    //Se modifica para enviarse.

    let formData = new FormData();

    formData.append('title', video.title as unknown as Blob);
    formData.append('description', video.description as unknown as Blob);
    formData.append('user_id', video.user_id as unknown as Blob);

    if (videoFile) {
      formData.append('video', videoFile);
    }

    return this.http.post<Video>(
      this.videosUrl,
      formData /*,
      this.httpOptions*/
    );
  }

  deleteVideo(id: number) {
    const url = `${this.videosUrl}/${id}`;

    return this.http.delete(url);
  }

  setKeywordSearch(keyword: string) {
    this.keywordSearch.next(keyword);
  }

  getKeywordSearch() {
    return this.keywordSearch;
  }
}
