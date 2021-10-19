import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { matchPassword } from '../confirm-password.directive';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //username: string = '';
  //confirmPassword = {} as FormControl;
  //password = {} as FormControl;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  registerForm = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: matchPassword('password', 'confirmPassword'),
      }
    );
  }

  register(user: User) {
    if (this.registerForm.valid) {
      this.userService.storeUser(user).subscribe((user) => {
        //console.log(user);
        this.login();
      });
    }
  }

  login(): void {
    this.authService
      .login(
        this.registerForm.controls.username.value,
        this.registerForm.controls.password.value
      )
      .subscribe((res) => {
        this.authService.setSession(res);

        this.authService.getUser().subscribe((user) => {
          this.authService.setUser(user);
        });

        this.router.navigate(['/']);
      });
  }
}
