import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment = {} as Comment;
  @Input() userId: number = 0;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
