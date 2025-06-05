import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  public registerForm: FormGroup;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      isCreator: [false]
    });
    }


    register() {
      if (this.registerForm.valid) {
        this.authService.registerUser(this.registerForm.value).subscribe({
          next: (response) => {
            console.log('Registration successful', response);
          },
          error: (error) => {
            console.error('Registration failed', error);
          }
        });
      } else {
        console.error('Form is invalid');
      }
      this.router.navigate(['/login']);
    }


}
