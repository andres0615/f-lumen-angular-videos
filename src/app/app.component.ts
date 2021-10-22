import { Component } from '@angular/core';
import { LoadingPageService } from './loading-page.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'La Videos';
  layoutAlign = 'column';
  topBarSpacer = true;

  constructor(
    public loadingPageService: LoadingPageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        /*if (!this.authService.refreshTokenExecuted) {
          this.authService.refreshTokenExecuted = true;

          let refreshTime = 10000;

          setInterval(() => {
            this.authService.refreshToken();
          }, refreshTime);
        }*/

        let fullWidth: boolean = false;

        if (
          this.router.url.includes('/settings') ||
          this.router.url.includes('/channel')
        ) {
          this.layoutAlign = 'column';
          this.topBarSpacer = false;
        } else {
          this.layoutAlign = 'row';
          this.topBarSpacer = true;
        }
      }
    });
  }
}
