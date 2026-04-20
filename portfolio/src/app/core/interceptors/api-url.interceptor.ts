import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiRequest = request.url.startsWith('/');
    
    if (isApiRequest) {
      const apiReq = request.clone({
        url: `${environment.apiUrl}${request.url}`
      });
      return next.handle(apiReq);
    }
    
    return next.handle(request);
  }
}
