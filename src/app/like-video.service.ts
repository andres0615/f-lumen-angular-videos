import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LikeVideo } from './like-video';

@Injectable({
  providedIn: 'root',
})
export class LikeVideoService {
  private likeVideoUrl = environment.apiUrl + '/like-video'; // URL to web api

  constructor(private http: HttpClient) {}

  getVideoTotalLikes(videoId: number) {
    return this.http.get<{ likes: number }>(
      this.likeVideoUrl + '/likes/total/' + videoId
    );
  }

  getVideoTotalDislikes(videoId: number) {
    return this.http.get<{ dislikes: number }>(
      this.likeVideoUrl + '/dislikes/total/' + videoId
    );
  }

  getUserLikeVideo(userId: number, videoId: number) {
    const url = `${this.likeVideoUrl}/${userId}/${videoId}`;

    return this.http.get<LikeVideo>(url);
  }

  setUserLikeVideo(likeVideo: LikeVideo) {
    const url = `${this.likeVideoUrl}`;

    return this.http.post<LikeVideo>(url, likeVideo);
  }

  deleteUserLikeVideo(likeVideo: LikeVideo) {
    const userId = likeVideo.user_id;
    const videoId = likeVideo.video_id;

    const url = `${this.likeVideoUrl}/${userId}/${videoId}`;

    return this.http.delete<LikeVideo>(url);
  }
}
