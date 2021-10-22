import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './video/video.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './account/account.component';
import { OnlyLoggedUsersGuard } from './only-logged-users.guard';
import { OnlyNoLoggedUsersGuard } from './only-no-logged-users.guard';
import { ChannelComponent } from './channel/channel.component';
import { AdminVideosComponent } from './admin-videos/admin-videos.component';
import { ChannelVideosComponent } from './channel-videos/channel-videos.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { SearchedVideosComponent } from './searched-videos/searched-videos.component';

const routes: Routes = [
  { path: '', component: VideosComponent },
  { path: 'video/:id', component: VideoComponent },
  { path: 'search', component: SearchedVideosComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [OnlyNoLoggedUsersGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [OnlyNoLoggedUsersGuard],
  },
  {
    path: 'settings',
    canActivate: [OnlyLoggedUsersGuard],
    children: [
      {
        path: '',
        component: SettingsComponent,
        children: [
          {
            path: 'account',
            component: AccountComponent,
          },
          {
            path: 'videos',
            component: AdminVideosComponent,
          },
          {
            path: 'videos/edit/:videoId',
            component: VideoEditComponent,
          },
          {
            path: 'videos/upload',
            component: VideoUploadComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'channel',
    children: [
      {
        path: ':user_id',
        component: ChannelComponent,
        children: [
          {
            path: 'videos',
            component: ChannelVideosComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
