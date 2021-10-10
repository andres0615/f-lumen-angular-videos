import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingPageService } from '../loading-page.service';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.css'],
})
export class ChannelVideosComponent implements OnInit {
  rowsVideos: Video[][] = [];

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    public loadingPageService: LoadingPageService
  ) {}

  ngOnInit(): void {
    this.loadingPageService.setLoading(true);
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos().subscribe((videos) => {
      console.log(videos);
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

  getUserId() {
    return Number(this.route.snapshot.paramMap.get('user_id'));
  }
}
