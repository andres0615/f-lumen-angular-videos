import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  { path: '', component: VideosComponent },
  { path: 'video/:id', component: VideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
