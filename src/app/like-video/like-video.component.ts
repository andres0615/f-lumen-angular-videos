import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { LikeVideo } from '../like-video';
import { LikeVideoService } from '../like-video.service';
import { LoadingPageService } from '../loading-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-like-video',
  templateUrl: './like-video.component.html',
  styleUrls: ['./like-video.component.css'],
})
export class LikeVideoComponent implements OnInit {
  @Input() videoId: number = 0;
  @Input() userId: number = 0;
  /* #region new design */

  @Input() likeCount: number = 0;
  @Input() dislikeCount: number = 0;
  @Input() initialReaction: 'like' | 'dislike' | null = null;
  
  @Output() likeChanged = new EventEmitter<boolean>();
  @Output() dislikeChanged = new EventEmitter<boolean>();

  /* #endregion  */

  public videoLikes: number = 0;
  public videoDislikes: number = 0;
  public likeVideo: boolean = false;
  public dislikeVideo: boolean = false;
  public userLikeVideo = {} as LikeVideo;

  /* #region new design */

  public isLiked: boolean = false;
  public isDisliked: boolean = false;

  /* #endregion  */

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private likeVideoService: LikeVideoService,
    public loadingPageService: LoadingPageService,
    public authService: AuthService
  ) {}

  /* #region new design */

  onLikeChange(event: MatButtonToggleChange): void {}

  onDislikeChange(event: MatButtonToggleChange): void {}

  /* #endregion  */

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getUserLikeVideo();
    }

    this.getVideoTotalLikes();
    this.getVideoTotalDislikes();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoId']) {
      this.likeVideo = false;
      this.dislikeVideo = false;

      if (this.authService.isLoggedIn()) {
        this.getUserLikeVideo();
      }
  
      this.getVideoTotalLikes();
      this.getVideoTotalDislikes();
    }
  }

  getVideoTotalLikes() {
    this.likeVideoService.getVideoTotalLikes(this.videoId).subscribe((res) => {
      this.videoLikes = res.likes;
    });
  }

  getVideoTotalDislikes() {
    this.likeVideoService
      .getVideoTotalDislikes(this.videoId)
      .subscribe((res) => {
        this.videoDislikes = res.dislikes;
      });
  }

  getUserLikeVideo() {
    this.likeVideoService
      .getUserLikeVideo(this.userId, this.videoId)
      .subscribe((likeVideo) => {
        console.log(likeVideo);
        this.userLikeVideo = likeVideo;

        // console.log(this.userLikeVideo.type);

        if (this.userLikeVideo.type != undefined) {
          if (this.userLikeVideo.type == true) {
            this.likeVideo = true;
          }

          if (this.userLikeVideo.type == false) {
            this.dislikeVideo = true;
          }
        }
      });
  }

  setUserLikeVideo(type: boolean) {
    this.userLikeVideo.user_id = this.userId;
    this.userLikeVideo.video_id = this.videoId;
    this.userLikeVideo.type = type;

    this.likeVideoService
      .setUserLikeVideo(this.userLikeVideo)
      .subscribe((likeVideo) => {
        this.getUserLikeVideo();
        this.getVideoTotalLikes();
        this.getVideoTotalDislikes();
      });
  }

  likeClick() {
    if (this.authService.isLoggedIn()) {
      this.dislikeVideo = false;
      this.likeVideo = !this.likeVideo;

      this.likeVideoService
        .deleteUserLikeVideo(this.userLikeVideo)
        .subscribe((res) => {
          if (this.likeVideo == true) {
            this.setUserLikeVideo(true);
          } else {
            this.getUserLikeVideo();
            this.getVideoTotalLikes();
          }
        });
    } else {
      this.router.navigate(['login']);
    }
  }

  dislikeClick() {
    if (this.authService.isLoggedIn()) {
      this.likeVideo = false;
      this.dislikeVideo = !this.dislikeVideo;

      this.likeVideoService
        .deleteUserLikeVideo(this.userLikeVideo)
        .subscribe((res) => {
          if (this.dislikeVideo == true) {
            this.setUserLikeVideo(false);
          } else {
            this.getUserLikeVideo();
            this.getVideoTotalDislikes();
          }
        });
    } else {
      this.router.navigate(['login']);
    }
  }
}
