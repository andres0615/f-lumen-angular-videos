import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public keywordSearch: string = '';

  constructor(public router: Router, public videoService: VideoService) {}

  ngOnInit(): void {}

  search() {
    this.videoService.setKeywordSearch(this.keywordSearch);
    this.router.navigate(['search']);
  }
}
