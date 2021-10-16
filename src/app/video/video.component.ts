import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingPageService } from '../loading-page.service';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  public video = {} as Video;

  public user = {} as User;

  public environment = environment;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    public loadingPageService: LoadingPageService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadingPageService.setLoading(true);
    this.getVideo();

    if (this.authService.isLoggedIn()) {
      this.loadingPageService.setLoading(true);
      this.authService.getUser().subscribe((user) => {
        this.user = user;
        this.loadingPageService.setLoading(false);
      });
    }
  }

  getVideo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.videoService.getVideo(id).subscribe((video) => {
      this.video = video;
      this.loadingPageService.setLoading(false);
    });
  }
}
