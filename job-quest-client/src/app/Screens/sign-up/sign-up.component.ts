import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, NgIf, RouterModule],
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

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Add your sign-up logic here
    this.authService.signup( { username: this.username, email: this.email, name: this.name, passwordHash: this.password}).subscribe({
      next: (res) => {
        // console.log(res)
        this.router.navigate(['/sign-in']);
      },
      error: (err) => {
        // console.log(err);
      }
    });
    this.errorMessage = '';
  }

  signInWithGoogle():void {
    window.location.href = environment.google_sign_in;
  }
}
