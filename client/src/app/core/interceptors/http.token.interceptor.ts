import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorage } from '../../website/auth/authority/token.storage';

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const authToken = this.injector.get(TokenStorage);
    const idToken = authToken.getToken();
    let authReq;
    if (idToken) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, idToken) });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
