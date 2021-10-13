import { Component, OnInit, Input } from '@angular/core';
import { LikeVideo } from '../like-video';
import { LikeVideoService } from '../like-video.service';
import { LoadingPageService } from '../loading-page.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-like-video',
  templateUrl: './like-video.component.html',
  styleUrls: ['./like-video.component.css'],
})
export class LikeVideoComponent implements OnInit {
  @Input() videoId: number = 0;
  @Input() userId: number = 0;

  //public likeIcon: string = 'thumb_up_off_alt';
  public videoLikes: number = 0;
  //public dislikeIcon: string = 'thumb_down_off_alt';
  public videoDislikes: number = 0;
  public likeVideo: boolean = false;
  public dislikeVideo: boolean = false;
  public userLikeVideo = {} as LikeVideo;

  constructor(
    private route: ActivatedRoute,
    private likeVideoService: LikeVideoService,
    public loadingPageService: LoadingPageService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserLikeVideo();
    this.getVideoTotalLikes();
    this.getVideoTotalDislikes();
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
    console.log(this.userId);
    console.log(this.videoId);

    this.likeVideoService
      .getUserLikeVideo(this.userId, this.videoId)
      .subscribe((likeVideo) => {
        console.log(likeVideo);
        this.userLikeVideo = likeVideo;

        //console.log(this.userLikeVideo.type);

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
  }

  dislikeClick() {
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
  }

  getVideoId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }
}
