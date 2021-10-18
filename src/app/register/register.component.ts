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

  constructor(private fb: FormBuilder) {}

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

    /*this.repeatPassword = new FormControl('', [
      Validators.required,
      isEqualValidator(this.password)
    ]);

    this.password = new FormControl('', [
      Validators.required,
      isEqualValidator(this.repeatPassword)
    ]);


    this.password.valueChanges.subscribe(() => {
      this.repeatPassword.updateValueAndValidity()
    });

    this.repeatPassword.valueChanges.subscribe(() => {
      this.password.updateValueAndValidity()
    });*/
  }

  register() {}

  forceValidAgain() {}
}
