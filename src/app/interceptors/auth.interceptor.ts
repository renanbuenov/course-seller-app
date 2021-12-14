import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      console.log('error', error);

      if (error instanceof HttpErrorResponse && [401, 403].includes(error.status)) {
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
      }

      return throwError(error);
    }));
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
