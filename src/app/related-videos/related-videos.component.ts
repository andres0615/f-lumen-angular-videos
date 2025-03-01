import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { LoadingPageService } from '../loading-page.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-related-videos',
  templateUrl: './related-videos.component.html',
  styleUrls: ['./related-videos.component.css'],
})
export class RelatedVideosComponent implements OnInit {
  @Input() videoId: number = 0;

  videos: Video[] = [];

  constructor(
    private videoService: VideoService,
    public loadingPageService: LoadingPageService
  ) {}

  ngOnInit(): void {
    this.loadingPageService.setLoading(true);
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos(this.videoId).subscribe((videos: Video[]) => {
      this.videos = videos;
      this.loadingPageService.setLoading(false);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.videoId && !changes.videoId.firstChange) {
      this.ngOnInit();
    }
  }
}
