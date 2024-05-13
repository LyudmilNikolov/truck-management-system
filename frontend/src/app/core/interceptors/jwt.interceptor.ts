import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenManageService } from '../auth/services/token-manage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private tokenManageService: TokenManageService) {}

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const authToken = this.tokenManageService.getToken();
    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
