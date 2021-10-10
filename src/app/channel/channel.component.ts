import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { LoadingPageService } from '../loading-page.service';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {
  user = {} as User;
  rowsVideos: Video[][] = [];
  activeLink: string = '';
  //links: Array<{link: string, label: string}> = {};
  links: { link: string; label: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public userService: UserService,
    private videoService: VideoService,
    public loadingPageService: LoadingPageService
  ) {}

  ngOnInit(): void {
    this.loadingPageService.setLoading(true);
    this.getUser();

    //this.links.push('test');
    //this.links.push('channel/' + this.getUserId() + '/videos');

    const tabRoutes = [
      {
        link: 'channel/' + this.getUserId() + '/videos',
        label: 'Videos',
      },
    ];

    this.links = tabRoutes;

    this.loadingPageService.setLoading(true);
    this.getVideos();
  }

  getUser(): void {
    if (this.route.firstChild) {
      const userId = this.getUserId();
      this.userService.getUser(userId).subscribe((user) => {
        this.user = user;
        this.loadingPageService.setLoading(false);
      });
    }
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

  getUserId() {
    return Number(this.route.snapshot.paramMap.get('user_id'));
  }
}
