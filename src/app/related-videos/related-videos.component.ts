import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { LoadingPageService } from '../loading-page.service';

@Component({
  selector: 'app-related-videos',
  templateUrl: './related-videos.component.html',
  styleUrls: ['./related-videos.component.css']
})
export class RelatedVideosComponent implements OnInit {
  videos: Video[] = [];

  constructor(
    private videoService: VideoService,
    public loadingPageService: LoadingPageService
    ) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos().subscribe((videos: Video[]) => {
      this.videos = videos;
    });
  }

}
