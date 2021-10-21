import { Component, OnInit, ViewChild } from '@angular/core';
import { Video } from '../video';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { VideoService } from '../video.service';
//import { MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './admin-videos.component.html',
  styleUrls: ['./admin-videos.component.css'],
})
export class AdminVideosComponent implements OnInit {
  displayedColumns: string[] = ['video', 'created_at', 'id'];
  videos: Video[] = [];
  user = {} as User;
  @ViewChild(MatTable) videosTable = {} as MatTable<any>;

  constructor(
    public authService: AuthService,
    public videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.videoService.getVideosByUserId(user.id).subscribe((videos) => {
        this.videos = videos;
      });
    });
  }

  deleteVideo(videoId: number) {
    this.videoService.deleteVideo(videoId).subscribe((res) => {
      for (var i = 0; i < this.videos.length; i++) {
        if (this.videos[i].id == videoId) {
          this.videos.splice(i, 1);
          this.videosTable.renderRows();
          break;
        }
      }
    });
  }
}
