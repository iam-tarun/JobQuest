import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignIn() {
    this.authService.login(this.username, this.password).subscribe({
      next: (token) => {
        console.log(token);
        localStorage.setItem('jwtToken', token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    })
  }
}
