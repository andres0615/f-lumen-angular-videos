import { Component, OnInit, SimpleChanges } from '@angular/core';
import { VideoService } from '../video.service';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searched-videos',
  templateUrl: './searched-videos.component.html',
  styleUrls: ['./searched-videos.component.css'],
})
export class SearchedVideosComponent implements OnInit {
  public keywordSearch: string = '';
  private videosSubscription = {} as Subscription;

  constructor(public videoService: VideoService) {}

  ngOnInit(): void {
    this.videosSubscription = this.videoService
      .getKeywordSearch()
      .subscribe((keywordSearch: string) => {
        console.log(keywordSearch);
        this.keywordSearch = keywordSearch;
      });
  }

  ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
  }
}
