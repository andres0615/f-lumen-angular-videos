import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, public router: Router) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let request = req;

    if (this.authService.isLoggedIn()) {
      const token = this.authService.getToken();

      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
          },
        });
      }

      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);

        if (err.status === 401) {
          // auto logout if 401 response returned from api

          //this.authenticationService.logout();

          //window.location.reload();
          this.router.navigate(['/login']);
        }

        const error = err.error.messages || err.statusText;

        return throwError(error);
      })
    );
  }
}
