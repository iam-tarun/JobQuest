import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSignUp() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.authService.signup({name: this.name, username: this.username, email: this.email, passwordHash: this.password}).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (e) => {
        console.log(e);
      }
    })
    // Add your sign-up logic here
    console.log('Sign-Up Successful:', { username: this.username, email: this.email, name: this.name, passwordHash: this.password});
    this.errorMessage = '';
  }
}
