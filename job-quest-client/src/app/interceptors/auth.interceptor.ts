import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { isTokenValid } from '../utils/validate_token';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken');

  const isPublicEndpoint = req.url.includes('/login') || req.url.includes('/register');

  if (token && !isPublicEndpoint && isTokenValid(token)) {
    // Clone the request and add the Authorization header
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`) 
    });
    return next(modifiedReq);
  }

  if (token && !isTokenValid(token) && !isPublicEndpoint) {
    localStorage.removeItem('jwtToken');
  }
  // If no token, pass the original request
  return next(req);
};
