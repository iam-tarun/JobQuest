import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken');

  const isPublicEndpoint = req.url.includes('/login') || req.url.includes('/register');

  if (token && !isPublicEndpoint) {
    // Clone the request and add the Authorization header
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`) 
    });
    return next(modifiedReq);
  }
  // If no token, pass the original request
  return next(req);
};
