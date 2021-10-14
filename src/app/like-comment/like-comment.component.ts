import { Component, OnInit, Input } from '@angular/core';
import { LikeComment } from '../like-comment';
import { LikeCommentService } from '../like-comment.service';
import { LoadingPageService } from '../loading-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-like-comment',
  templateUrl: './like-comment.component.html',
  styleUrls: ['./like-comment.component.css'],
})
export class LikeCommentComponent implements OnInit {
  @Input() commentId: number = 0;
  @Input() userId: number = 0;

  public commentLikes: number = 0;
  public commentDislikes: number = 0;
  public likeComment: boolean = false;
  public dislikeComment: boolean = false;
  public userLikeComment = {} as LikeComment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private likeCommentService: LikeCommentService,
    public loadingPageService: LoadingPageService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getUserLikeComment();
    }

    this.getCommentTotalLikes();
    this.getCommentTotalDislikes();
  }

  getCommentTotalLikes() {
    this.likeCommentService
      .getCommentTotalLikes(this.commentId)
      .subscribe((res) => {
        this.commentLikes = res.likes;
      });
  }

  getCommentTotalDislikes() {
    this.likeCommentService
      .getCommentTotalDislikes(this.commentId)
      .subscribe((res) => {
        this.commentDislikes = res.dislikes;
      });
  }

  getUserLikeComment() {
    this.likeCommentService
      .getUserLikeComment(this.userId, this.commentId)
      .subscribe((likeComment) => {
        console.log(likeComment);
        this.userLikeComment = likeComment;

        if (this.userLikeComment.type != undefined) {
          if (this.userLikeComment.type == true) {
            this.likeComment = true;
          }

          if (this.userLikeComment.type == false) {
            this.dislikeComment = true;
          }
        }
      });
  }

  setUserLikeComment(type: boolean) {
    this.userLikeComment.user_id = this.userId;
    this.userLikeComment.comment_id = this.commentId;
    this.userLikeComment.type = type;

    this.likeCommentService
      .setUserLikeComment(this.userLikeComment)
      .subscribe((likeComment) => {
        this.getUserLikeComment();
        this.getCommentTotalLikes();
        this.getCommentTotalDislikes();
      });
  }

  likeClick() {
    if (this.authService.isLoggedIn()) {
      this.dislikeComment = false;
      this.likeComment = !this.likeComment;

      this.likeCommentService
        .deleteUserLikeComment(this.userLikeComment)
        .subscribe((res) => {
          if (this.likeComment == true) {
            this.setUserLikeComment(true);
          } else {
            this.getUserLikeComment();
            this.getCommentTotalLikes();
          }
        });
    } else {
      this.router.navigate(['login']);
    }
  }

  dislikeClick() {
    if (this.authService.isLoggedIn()) {
      this.likeComment = false;
      this.dislikeComment = !this.dislikeComment;

      this.likeCommentService
        .deleteUserLikeComment(this.userLikeComment)
        .subscribe((res) => {
          if (this.dislikeComment == true) {
            this.setUserLikeComment(false);
          } else {
            this.getUserLikeComment();
            this.getCommentTotalDislikes();
          }
        });
    } else {
      this.router.navigate(['login']);
    }
  }
}
