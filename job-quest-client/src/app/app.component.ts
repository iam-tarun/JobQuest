import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Screens/navbar/navbar.component';
import { AuthService } from './services/auth.service';

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

  isAuthenticated = false;

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isAuthenticated = status;
    });

    this.authService.checkLoginStatus();
  }

}
