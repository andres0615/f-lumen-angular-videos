import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm = {} as FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { 
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    let password = form.get('password')?.value;
    let confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
    
    return null;
  }

  // onSubmit(user: User): void {
  //   if (this.signupForm.valid) {
  //     this.register(user);
  //   }
  // }

  signup(user: User) {
    if (this.signupForm.valid) {
      this.userService.storeUser(user).subscribe((user) => {
        //console.log(user);
        this.login();
      });
    }
  }

  login(): void {
    this.authService
      .login(
        this.signupForm.controls.username.value,
        this.signupForm.controls.password.value
      )
      .subscribe((res) => {
        this.authService.setSession(res);

        this.authService.getUser().subscribe((user) => {
          this.authService.setUser(user);

          this.router.navigate(['/']);
        });

        // this.router.navigate(['/']);
      });
  }
}