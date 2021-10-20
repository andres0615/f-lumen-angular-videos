import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { environment } from '../../environments/environment';
import { LoadingPageService } from '../loading-page.service';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css'],
})
export class VideoEditComponent implements OnInit {
  public video = {} as Video;
  public environment = environment;
  videoForm = {} as FormGroup;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    public loadingPageService: LoadingPageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    const id = Number(this.route.snapshot.paramMap.get('videoId'));

    this.videoService.getVideo(id).subscribe((video) => {
      this.video = video;
      this.loadingPageService.setLoading(false);

      this.videoForm.controls.id.setValue(this.video.id);
      this.videoForm.controls.title.setValue(this.video.title);
      this.videoForm.controls.description.setValue(this.video.description);
    });
  }

  save(video: Video) {
    console.log(this.video);

    if (this.videoForm.valid) {
      this.videoService.updateVideo(video).subscribe((video) => {
        this.video = video;
      });
    }
  }
}
