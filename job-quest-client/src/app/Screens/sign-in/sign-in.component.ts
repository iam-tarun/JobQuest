import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, NgIf, RouterModule],
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
      next: () => {
        this.authService.isAuthenticated().subscribe({
          next: (authenticated) => {
            if (authenticated) {
              this.router.navigate(['/']);
            }
          },
          error:() => {
            this.errorMessage = "Invalid Password or Username";
          }
        });
      }
    });
  }

  signInWithGoogle():void {
    window.location.href = environment.google_sign_in;
  }

}
