import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';
import { LoadingPageService } from '../loading-page.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];

  constructor(
    private commentService: CommentService,
    public loadingPageService: LoadingPageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getComments();
    this.loadingPageService.setLoading(true);
  }

  getComments(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.commentService.getComments(id).subscribe((comments) => {
      console.log(comments);
      this.comments = comments;
      this.loadingPageService.setLoading(false);
    });
  }
}
