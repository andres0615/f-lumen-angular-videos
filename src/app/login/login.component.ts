import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn());
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe((res) => {
      this.authService.setSession(res);
      this.router.navigate(['/']);
    });
  }
}
