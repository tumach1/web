import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
        this.authService.register(this.registerForm.value).subscribe({
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
    }


}
