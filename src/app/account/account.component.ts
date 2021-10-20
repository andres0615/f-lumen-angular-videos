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
      const file = fileList[0];

      this.userPhoto = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.user.photo = reader.result;
      };
    }
  }
}
