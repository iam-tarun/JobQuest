import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Screens/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIf,
    NavbarComponent,
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'job-quest-client';

  constructor(private authService: AuthService) {}

  isAuthenticated: boolean = true;
  private authSubscription?: Subscription;
  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated().subscribe({
      next: (authenticated) => {
        console.log('Authentication status:', authenticated);
        this.isAuthenticated = authenticated;
      },
      error: (err) => {
        console.error('Error checking authentication status:', err);
        this.isAuthenticated = false;
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.authSubscription?.unsubscribe();
  }

}
