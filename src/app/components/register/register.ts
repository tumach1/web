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
        console.log("Registering user with data:", this.registerForm.value );
        if(this.registerForm.value.isCreator === "true") {
          this.registerForm.value.isCreator = true;
        }
        this.authService.registerUser(this.registerForm.value).subscribe({
          next: (response) => {
            console.log('Registration successful', response);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.errorMessage = error.error.message;
          }
        });
      } else {
        this.errorMessage = "Please fill in all required fields.";
      }

    }


}
