import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {LoginForm} from '../../interfaces/login-form';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login{
  public loginForm : FormGroup;
  public errorMessage: string = '';

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

  }

  get username() {
    return this.loginForm.controls['username'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const loginPayload: LoginForm = {
        username: this.loginForm.value.username || '',
        password: this.loginForm.value.password || ''
      };
      this.authService.loginUser(loginPayload).subscribe(
        () => {

          const token = localStorage.getItem("token");
          if (!token) {
            return;
          }

          console.log("Login successful, redirecting...");
          // this.msgService.add({ severity: 'success', summary: 'Login success', detail: 'Witaj w EasyRent' });
          //}
        },
        (error) => {
          if(error.status === 404) {
            this.errorMessage = error.error.message;
            console.log("here", this.errorMessage);
          }
          else if(error.status === 401) {
            this.errorMessage = error.error.message;
          }
          // this.msgService.add({ severity: 'error', summary: 'Login error', detail: 'Wpisz poprawne dane.' });
        }
      );
    } else {
      console.log("Form is invalid");
      // this.msgService.add({ severity: 'error', summary: 'Login erro', detail: 'Wpisz poprawne dane.' });
    }
  }


};
