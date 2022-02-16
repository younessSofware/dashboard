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
    console.log("interceptor !!!");

    const token = localStorage.getItem('token')
    console.log(token);


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
            console.log('Internal server error');
            if(err.status == 401){
              localStorage.removeItem('token')
              this.router.navigateByUrl('/auth/login')
            }
            errorMsg = `Internal server error`;
        }
        return throwError(() => new Error(errorMsg))
      })
    //   catchError((error: HttpErrorResponse) => {
    //     let errorMsg = '';
    //     if (error.error instanceof ErrorEvent) {
    //         console.log('This is client side error');
    //         errorMsg = `Error: ${error.error.message}`;
    //     } else {
    //         console.log('This is server side error');
    //         errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    //     }
    //     console.log(errorMsg);
    //     return throwError(errorMsg);
    // })
    )
  }
}
