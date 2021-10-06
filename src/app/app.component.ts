import { Component } from '@angular/core';
import { LoadingPageService } from './loading-page.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'La Videos';
  layoutAlign = 'column';

  constructor(
    public loadingPageService: LoadingPageService,
    private router: Router
    ) {}

  ngOnInit() {
    
    this.router.events.subscribe((val) => {

      if(val instanceof NavigationEnd) {

        let fullWidth: boolean = false;

        fullWidth = this.router.url.includes('/settings');

        if (fullWidth === true) {
            this.layoutAlign = 'column';
        } else {
            this.layoutAlign = 'row';
        }
      }

    });

  }
}
