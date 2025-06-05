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

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
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

          const userIdString = localStorage.getItem("user_id");
          if (!userIdString) {
            return;
          }
          const userId: number = parseInt(userIdString, 10);
          // const userRoles = this.userService.getUserRoles(userId).subscribe(
          //   roles => {
          //     if(roles.includes('TENANT'))
          //       this.router.navigate(['/renter/renter-apartment']);       //jak damy radę to damy tu hello
          //     else if(roles.includes('OWNER'))
          //       this.router.navigate(['/owner/owner-apartments']);        //tu też
          //   });
          console.log("Login successful, redirecting...");
          // this.msgService.add({ severity: 'success', summary: 'Login success', detail: 'Witaj w EasyRent' });
          //}
        },
        (error) => {
          console.error('Login error:', error);
          // this.msgService.add({ severity: 'error', summary: 'Login error', detail: 'Wpisz poprawne dane.' });
        }
      );
    } else {
      console.log("Form is invalid");
      // this.msgService.add({ severity: 'error', summary: 'Login erro', detail: 'Wpisz poprawne dane.' });
    }
  }


};
