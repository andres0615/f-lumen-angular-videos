import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../comment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Output() deleteComment: EventEmitter<number> = new EventEmitter();
  @Input() comment = {} as Comment;
  @Input() userId: number = 0;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  delete() {
    this.deleteComment.emit(this.comment.id);
  }
}
