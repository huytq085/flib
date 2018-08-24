import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { JwtService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    // private jwtService: JwtService,
    private _router: Router
  ) { }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // const token = this.jwtService.getToken();
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzUxMjg3NjUsImVtYWlsIjoibWVtYmVyQGdtYWlsLmNvbSJ9.VRF1tFiCNTAluCDTDx2k0en3BcV6P8f60bXfKq1kzZM';
    const authType: string = this._router.url;
      

    if (token && !(authType === '/login' || authType === '/register' )) {
      headersConfig['Authorization'] = `${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
