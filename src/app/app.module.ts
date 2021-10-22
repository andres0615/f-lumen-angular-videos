import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './video/video.component';
import { RelatedVideosComponent } from './related-videos/related-videos.component';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './account/account.component';
import { ChannelComponent } from './channel/channel.component';
import { ChannelVideosComponent } from './channel-videos/channel-videos.component';
import { ThumbnailVideoThemeOneComponent } from './thumbnail-video-theme-one/thumbnail-video-theme-one.component';
import { LikeVideoComponent } from './like-video/like-video.component';
import { LikeCommentComponent } from './like-comment/like-comment.component';
import { CommentComponent } from './comment/comment.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmPasswordDirective } from './confirm-password.directive';
import { AdminVideosComponent } from './admin-videos/admin-videos.component';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { UploadingSpinnerComponent } from './uploading-spinner/uploading-spinner.component';
import { SearchComponent } from './search/search.component';
import { SearchedVideosComponent } from './searched-videos/searched-videos.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    VideosComponent,
    VideoComponent,
    RelatedVideosComponent,
    CommentsComponent,
    LoginComponent,
    SettingsComponent,
    AccountComponent,
    ChannelComponent,
    ChannelVideosComponent,
    ThumbnailVideoThemeOneComponent,
    LikeVideoComponent,
    LikeCommentComponent,
    CommentComponent,
    AddCommentComponent,
    RegisterComponent,
    ConfirmPasswordDirective,
    AdminVideosComponent,
    VideoEditComponent,
    VideoUploadComponent,
    UploadingSpinnerComponent,
    SearchComponent,
    SearchedVideosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatProgressBarModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatMenuModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
