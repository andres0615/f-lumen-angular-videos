import { Component, OnInit, SimpleChanges } from '@angular/core';
import { VideoService } from '../video.service';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Video } from '../video';
import { LoadingPageService } from '../loading-page.service';

@Component({
  selector: 'app-searched-videos',
  templateUrl: './searched-videos.component.html',
  styleUrls: ['./searched-videos.component.css'],
})
export class SearchedVideosComponent implements OnInit {
  public keywordSearch: string = '';
  private videosSubscription = {} as Subscription;
  public videos = [] as Video[];

  constructor(
    public videoService: VideoService,
    public loadingPageService: LoadingPageService
  ) {}

  ngOnInit(): void {
    this.videosSubscription = this.videoService
      .getKeywordSearch()
      .subscribe((keywordSearch: string) => {
        console.log(keywordSearch);

        if (keywordSearch) {
          this.keywordSearch = keywordSearch;

          this.loadingPageService.setLoading(true);

          this.videoService
            .searchVideos(this.keywordSearch)
            .subscribe((videos) => {
              console.log(videos);
              this.videos = videos;
              this.loadingPageService.setLoading(false);
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
  }
}
