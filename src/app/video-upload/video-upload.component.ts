import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../video';
import { User } from '../user';
import { VideoService } from '../video.service';
import { AuthService } from '../auth.service';
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
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css'],
})
export class VideoUploadComponent implements OnInit {
  public video = {} as Video;
  public environment = environment;
  videoForm = {} as FormGroup;
  public photoSrc: string | ArrayBuffer | null = null;
  private videoFile?: File;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    public loadingPageService: LoadingPageService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      description: ['', Validators.required],
      user_id: 0,
    });

    this.authService.getUser().subscribe((user) => {
      this.videoForm.controls.user_id.setValue(user.id);
    });
  }

  save(video: Video) {
    console.log(video);

    if (this.videoForm.valid) {
      this.videoService
        .storeVideo(video, this.videoFile)
        .subscribe((resVideo) => {
          //this.video = video;
          console.log('subido ' + resVideo.id);
        });
    }
  }

  videoChange(event: any) {
    const file = event.target.files[0];

    this.videoFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.video.video = reader.result;
      console.log(this.video.video);
    };
  }
}
