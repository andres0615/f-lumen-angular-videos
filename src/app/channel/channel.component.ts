import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { LoadingPageService } from '../loading-page.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {
  user = {} as User;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public userService: UserService,
    public loadingPageService: LoadingPageService
  ) {}

  ngOnInit(): void {
    this.loadingPageService.setLoading(true);
    this.getUser();
  }

  getUser(): void {
    if (this.route.firstChild) {
      const userId = Number(
        this.route.firstChild.snapshot.paramMap.get('user_id')
      );
      console.log(userId);
      this.userService.getUser(userId).subscribe((user) => {
        this.user = user;
        this.loadingPageService.setLoading(false);
      });
    }
  }
}
