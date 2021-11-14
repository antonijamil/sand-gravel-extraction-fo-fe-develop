import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/http/auth.service';
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
      req = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
        })
      });
    }
    else{
      this.router.navigate(['/login']);
    }
    return next.handle(req).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.router.navigate(['/login']);
        }
      }));
  }
}

