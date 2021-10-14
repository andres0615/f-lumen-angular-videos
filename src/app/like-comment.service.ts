import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LikeComment } from './like-comment';

@Injectable({
  providedIn: 'root',
})
export class LikeCommentService {
  private likeCommentUrl = environment.apiUrl + '/like-comment'; // URL to web api

  constructor(private http: HttpClient) {}

  getCommentTotalLikes(commentId: number) {
    return this.http.get<{ likes: number }>(
      this.likeCommentUrl + '/likes/total/' + commentId
    );
  }

  getCommentTotalDislikes(commentId: number) {
    return this.http.get<{ dislikes: number }>(
      this.likeCommentUrl + '/dislikes/total/' + commentId
    );
  }

  getUserLikeComment(userId: number, commentId: number) {
    const url = `${this.likeCommentUrl}/${userId}/${commentId}`;

    return this.http.get<LikeComment>(url);
  }

  setUserLikeComment(likeComment: LikeComment) {
    const url = `${this.likeCommentUrl}`;

    return this.http.post<LikeComment>(url, likeComment);
  }

  deleteUserLikeComment(likeComment: LikeComment) {
    const userId = likeComment.user_id;
    const commentId = likeComment.comment_id;

    const url = `${this.likeCommentUrl}/${userId}/${commentId}`;

    return this.http.delete<LikeComment>(url);
  }
}
