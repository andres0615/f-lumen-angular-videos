import { Component } from '@angular/core';
import { LoadingPageService } from './loading-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'La Videos';

  constructor(public loadingPageService: LoadingPageService) {}

}
