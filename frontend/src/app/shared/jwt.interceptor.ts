import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    //is client is logged add the token to header
    if (this.auth.isLoggedIn()) {
      let token = this.auth.getToken();
      request = request.clone({
        setHeaders: {
          'x-access-token': `${token}`
        }})
    }
        
    return next.handle(request || null);
  }
}
