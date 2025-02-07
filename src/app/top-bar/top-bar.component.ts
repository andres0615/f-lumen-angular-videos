import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  //user = {} as User;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getUser().subscribe((user) => {
        this.authService.setUser(user);
      },
      (error) => {
        // on error, repeat the request again after 1 second
        setTimeout(() => {
          this.authService.getUser().subscribe((user) => {
            this.authService.setUser(user);
          });
        }, 1000);
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe((res) => {
      this.authService.logout();
      this.authService.deleteSession();
      this.router.navigate(['/']);
    });
  }

  navigateToChannel() {
    const url = '/channel/' + this.authService.user.id + '/videos';

    this.router.navigate([url]);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
