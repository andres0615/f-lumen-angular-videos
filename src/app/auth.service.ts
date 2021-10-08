import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = environment.apiUrl + '/auth'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getToken() {
    if (localStorage.getItem('access_token')) {
      let access_token = JSON.parse(localStorage.getItem('access_token')!);
      return access_token.value;
    }
  }

  setSession(token: any) {
    let ttl = this.getTokenExpiresIn() * 1000;

    this.setWithExpiry('access_token', token.access_token, ttl);
    this.setWithExpiry('token_type', token.token_type, ttl);
    this.setWithExpiry('expires_in', token.expires_in, ttl);

    this.refreshToken();
  }

  getUser(): Observable<User> {
    return this.http.post<any>(this.authUrl + '/me', {});
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (token) {
      return true;
    }

    return false;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.authUrl + '/login', {
      username: username,
      password: password,
    });
  }

  logout() {
    return this.http.post<any>(this.authUrl + '/logout', []);
  }

  deleteSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('expires_in');
  }

  refreshToken() {
    if (this.getToken()) {
      this.http.post<any>(this.authUrl + '/refresh', []);

      let refreshTime = (this.getTokenExpiresIn() * 1000) / 2;

      setTimeout(() => {
        this.refreshToken();
      }, refreshTime);
    }
  }

  getTokenExpiresIn(): number {
    let expires_in = localStorage.getItem('expires_in');

    if (expires_in) {
      return +expires_in;
    }

    return 0;
  }

  setWithExpiry(key: any, value: any, ttl: number) {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
}
