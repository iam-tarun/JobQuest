import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
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

  isAuthenticated(): Observable<boolean> {
    return this.http.get<{authenticated: boolean; message: string}>(this.baseUrl+"/auth/status", {withCredentials: true}).pipe(map((response) => response.authenticated), catchError(() => of(false)));
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.baseUrl+"/logout", {}, { withCredentials: true });
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('jwtToken');
    this.isLoggedInSubject.next(!!token);
  }

  signup(user: any): Observable<any>{
    return this.http.post<any>(this.baseUrl+'/register', user);
  }

}
