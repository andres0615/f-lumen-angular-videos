import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { environment } from '../../environments/environment';
import { LoadingPageService } from '../loading-page.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  rowsVideos: Video[][] = [];

  constructor(
    private videoService: VideoService,
    public loadingPageService: LoadingPageService
  ) {}

  ngOnInit(): void {
    this.loadingPageService.setLoading(true);
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos().subscribe((videos) => {
      this.rowsVideos = this.chunk(videos);
      this.loadingPageService.setLoading(false);
    });
  }

  chunk(videos: Video[]) {
    let chunkedVideos = [];
    let size = 4;

    for (let i = 0; i < videos.length; i += size) {
      chunkedVideos.push(videos.slice(i, i + size));
    }

    return chunkedVideos;
  }
}
