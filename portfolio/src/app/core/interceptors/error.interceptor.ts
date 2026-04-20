import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          // Client side error
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Server side error
          errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error('SYSTEM.API_FAULT(): ', errorMsg);
        // Optionally inject a global toast/snack-bar service here
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
