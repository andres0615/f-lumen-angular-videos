import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './video/video.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './account/account.component';
import { OnlyLoggedUsersGuard } from './only-logged-users.guard';
import { OnlyNoLoggedUsersGuard } from './only-no-logged-users.guard';

const routes: Routes = [
  { path: '', component: VideosComponent },
  { path: 'video/:id', component: VideoComponent },
  {
    path: 'login',
    component: LoginComponent,
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
