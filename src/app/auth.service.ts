import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.apiUrl + '/auth'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {

  }

  getToken() {
    return localStorage.getItem("access_token");
  }

  /*getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }*/

  isLoggedIn(): boolean {
    const token = this.getToken();

    if(token){
      return true;
    }

    return false;
  }

  login(username:string, password:string ) {
        return this.http.post<any>(this.authUrl + '/login', {'username': username, 'password': password});
  }

  logout() {
      localStorage.removeItem("access_token");
  }
}
