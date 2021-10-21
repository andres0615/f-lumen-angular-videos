import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { LoadingPageService } from '../loading-page.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  @Input() videoId: number = 0;
  @Input() userId: number = 0;

  constructor(
    private commentService: CommentService,
    public loadingPageService: LoadingPageService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getComments();
    this.loadingPageService.setLoading(true);
  }

  getComments(): void {
    this.commentService.getComments(this.videoId).subscribe((comments) => {
      console.log(comments);
      this.comments = comments;
      this.loadingPageService.setLoading(false);
    });
  }

  addComment(comment: Comment) {
    //console.log(comment);
    this.comments.unshift(comment);
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe((res) => {
      for (var i = 0; i < this.comments.length; i++) {
        if (this.comments[i].id == commentId) {
          this.comments.splice(i, 1);
          break;
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.videoId && !changes.videoId.firstChange) {
      this.ngOnInit();
    }
  }
}
