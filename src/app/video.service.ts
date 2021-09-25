import { Injectable } from '@angular/core';
import { Video } from './video';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videosUrl = 'http://localhost:8000/video'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient
  ) { }

  getVideos(): Observable<Video[]> {
    //this.messageService.add('HeroService: fetched heroes');
    //const heroes = of(HEROES);
    //return heroes;
    return this.http.get<Video[]>(this.videosUrl);
  }

}
