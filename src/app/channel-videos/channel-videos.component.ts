import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  ParamMap,
} from '@angular/router';
import { LoadingPageService } from '../loading-page.service';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.css'],
})
export class ChannelVideosComponent implements OnInit {
  rowsVideos: Video[][] = [];

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    public loadingPageService: LoadingPageService,
    private router: Router
  ) {
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.parent!.paramMap.subscribe((params: ParamMap) => {
      this.loadingPageService.setLoading(true);
      this.getVideos();
    });
  }

  getVideos(): void {
    const userId = this.getUserId();
    //console.log(userId);

    this.videoService.getVideosByUserId(userId).subscribe((videos) => {
      //console.log(videos);
      this.rowsVideos = this.chunk(videos);
      this.loadingPageService.setLoading(false);
    });
  }

  chunk(videos: Video[]) {
    let chunkedVideos = [];
    let size = 4;

    for (let i = 0; i <= videos.length; i += size) {
      //Se obtienen size numero de videos videos osea una fila (row).
      let rowVideos = videos.slice(i, i + size);

      chunkedVideos.push(rowVideos);
    }

    //Se obtiene la ultima fila.
    let lastRow = chunkedVideos.pop();

    if (lastRow) {
      let emptyItemsSize = size - lastRow.length;

      for (let i = 0; i < emptyItemsSize; i++) {
        lastRow.push({} as Video);
      }

      chunkedVideos.push(lastRow);
    }

    return chunkedVideos;
  }

  getUserId() {
    return Number(this.route.parent!.snapshot.paramMap.get('user_id'));
  }
}
