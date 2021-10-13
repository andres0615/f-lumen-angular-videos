import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public user = {} as User;
  public newUser = {} as User;
  //public photo = ;
  private userPhoto?: File;

  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      console.log(user);
      this.user = user;
    });
  }

  updateUser() {
    if (this.user) {
      //Se clona el objeto original.
      //this.newUser = JSON.parse(JSON.stringify(this.user));

      //Se modifica para enviarse.
      //this.newUser.photo = 'test';

      /*let photo;
       */

      this.userService
        .updateUser(this.user, this.userPhoto)
        .subscribe((user) => {
          this.user = user;
        });
    }
  }

  photoChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.userPhoto = fileList[0];

      //let formData:FormData = new FormData();
      //formData.append('uploadFile', file, file.name);

      /*let headers = new Headers();

        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.apiEndPoint}`, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            )*/
    }
  }
}
