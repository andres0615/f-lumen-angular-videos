import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
