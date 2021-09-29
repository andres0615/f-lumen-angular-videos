import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  video: Video = {
    'id': 0,
    'title': '',
    'description': '',
    'video': '',
    'thumbnail': '',
    'user_id': 0,
    'created_at': '',
    'updated_at': ''
  };

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    ) { }

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.videoService.getVideo(id).subscribe((video) => (this.video = video));
  }

}