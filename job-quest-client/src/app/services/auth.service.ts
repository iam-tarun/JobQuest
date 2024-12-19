import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, passwordHash: string): Observable<any> {
    return this.http.post<string>(this.baseUrl+'/login', {username, passwordHash});
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

  signup(user: any): Observable<any>{
    return this.http.post<any>(this.baseUrl+'/register', user);
  }

}
