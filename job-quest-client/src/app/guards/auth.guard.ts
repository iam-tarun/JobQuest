import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { catchError, map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((authenticated) => {
        if (authenticated) {
          return true; // Allow access
        }
        this.router.navigate(['/sign-in']); // Redirect to sign-in
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/sign-in']); // Redirect on error
        return [false];
      })
    );
  }
}