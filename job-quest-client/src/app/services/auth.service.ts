import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, passwordHash: string): Observable<string> {
    return this.http.post<string>(this.loginUrl, {username, passwordHash});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userDetails');

    this.router.navigate(['/sign-in'])
  }
}
