import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next.handle(request).pipe(
      catchError((err) => {
        let errorMsg = '';
        const error = err.error
        if (error instanceof ErrorEvent) {
            errorMsg = error.message;
        } else {
            if(err.status == 401){
              localStorage.removeItem('token')
              this.router.navigateByUrl('/auth/login')
            }
            if(err.status == 400) return throwError(() => error)
            if(err.status == 500) errorMsg = `Internal server error`;
            else errorMsg = err.error.message;
        }
        return throwError(() => errorMsg)
      })
    )
  }
}
