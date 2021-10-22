import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-thumbnail-video-theme-two',
  templateUrl: './thumbnail-video-theme-two.component.html',
  styleUrls: ['./thumbnail-video-theme-two.component.css'],
})
export class ThumbnailVideoThemeTwoComponent implements OnInit {
  @Input() video = {} as Video;

  constructor() {}

  ngOnInit(): void {}
}
