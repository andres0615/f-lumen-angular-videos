import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.css'],
})
export class AdminVideosComponent implements OnInit {
  displayedColumns: string[] = ['video', 'created_at', 'id'];
  videos: Video[] = [];
  user = {} as User;

  constructor(
    public authService: AuthService,
    public videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.videoService
        .getVideosByUserId(user.id /*, true*/)
        .subscribe((videos) => {
          this.videos = videos;
        });
    });
  }
}
