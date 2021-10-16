import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit {
  @Output() newComment: EventEmitter<Comment> = new EventEmitter();
  @Input() videoId: number = 0;
  @Input() userId: number = 0;

  public comment = {} as Comment;

  constructor(public commentService: CommentService) {}

  ngOnInit(): void {
    this.initComment();
  }

  addComment() {
    this.commentService.storeComment(this.comment).subscribe((comment) => {
      this.comment = comment;
      this.newComment.emit(this.comment);
      this.initComment();
    });
  }

  initComment() {
    this.comment = {} as Comment;
    this.comment.user_id = this.userId;
    this.comment.video_id = this.videoId;
  }
}
