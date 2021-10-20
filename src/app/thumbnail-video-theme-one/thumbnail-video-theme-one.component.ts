import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-thumbnail-video-theme-one',
  templateUrl: './thumbnail-video-theme-one.component.html',
  styleUrls: ['./thumbnail-video-theme-one.component.css'],
})
export class ThumbnailVideoThemeOneComponent implements OnInit {
  @Input() video: Video = {
    id: 0,
    title: '',
    description: '',
    video: '',
    thumbnail: '',
    user_id: 0,
    username: '',
    user_photo: '',
    created_at: '',
    updated_at: '',
  };
  @Input() titleColor: string = '#000';

  constructor() {}

  ngOnInit(): void {}
}
