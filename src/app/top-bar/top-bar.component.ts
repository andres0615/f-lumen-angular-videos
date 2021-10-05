import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
