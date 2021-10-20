import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = environment.apiUrl + '/user'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({
      contentType: 'multipart/form-data',
      accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.get<User>(url);
  }

  updateUser(user: User, userPhoto?: File): Observable<User> {
    //Se modifica para enviarse.

    let formData = new FormData();

    formData.append('id', user.id as unknown as Blob);
    formData.append('username', user.username as unknown as Blob);
    formData.append('created_at', user.created_at as unknown as Blob);
    formData.append('updated_at', user.updated_at as unknown as Blob);

    if (userPhoto) {
      formData.append('photo', userPhoto);
    }

    return this.http.post<User>(
      this.usersUrl + '/' + user.id,
      formData,
      this.httpOptions
    );
  }

  storeUser(user: User) {
    const url = `${this.usersUrl}`;

    return this.http.post<User>(url, user);
  }
}
