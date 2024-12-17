import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

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

  onSignUp() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Add your sign-up logic here
    console.log('Sign-Up Successful:', { username: this.username, email: this.email, name: this.name, passwordHash: this.password});
    this.errorMessage = '';
  }
}
