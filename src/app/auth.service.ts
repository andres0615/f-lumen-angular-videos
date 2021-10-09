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
  public user = {} as User;

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
    localStorage.setItem('expires_in', token.expires_in);

    let ttl = ((this.getTokenExpiresIn() * 1000) / 4) * 3;

    this.setWithExpiry('access_token', token.access_token, ttl);
    this.setWithExpiry('token_type', token.token_type, ttl);

    //this.refreshToken();
  }

  getUser(): Observable<User> {
    return this.http.post<any>(this.authUrl + '/me', {});
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (token) {
      if (this.isTokenExpired() == true) {
        return false;
      }

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
    let expiresIn = localStorage.getItem('expires_in');

    if (expiresIn) {
      return +expiresIn;
    }

    return 0;
  }

  setWithExpiry(key: any, value: any, ttl: number) {
    const now = new Date();

    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  isTokenExpired() {
    if (localStorage.getItem('access_token')) {
      let access_token = JSON.parse(localStorage.getItem('access_token')!);

      const now = new Date();

      if (now.getTime() > access_token.expiry) {
        return true;
      }

      return false;
    }

    return true;
  }

  setUser(user: User) {
    this.user = user;
  }
}
