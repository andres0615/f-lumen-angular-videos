import { Injectable } from '@angular/core';
import { Comment } from './comment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentsUrl = environment.apiUrl + '/comment'; // URL to web api

  constructor(private http: HttpClient) {}

  getComments(videoId: number): Observable<Comment[]> {
    const url = `${this.commentsUrl}/video/${videoId}`;

    return this.http.get<Comment[]>(url);
  }

  storeComment(comment: Comment) {
    const url = `${this.commentsUrl}`;

    return this.http.post<Comment>(url, comment);
  }

  deleteComment(id: number) {
    const url = `${this.commentsUrl}/${id}`;

    return this.http.delete(url);
  }
}
