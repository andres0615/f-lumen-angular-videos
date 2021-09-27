import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  rowsVideos: Video[][] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos().subscribe((videos) => {
      this.rowsVideos = this.chunk(videos);
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
