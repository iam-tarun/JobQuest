import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://backend:8080/api/login';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, passwordHash: string): Observable<any> {
    return this.http.post<string>(this.loginUrl, {username, passwordHash});
  }

  setLoggedInSubject() {
    this.isLoggedInSubject.next(true);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userDetails');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/sign-in'])
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('jwtToken');
    this.isLoggedInSubject.next(!!token);
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>("http://backend:8080/api/register", user);
  }
}
