import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let token = localStorage.getItem('token');
    //let IDS001=localStorage.getItem('ID_USER')

    if(!token){token = ""}; //evitar erro com valor nulo

    request = request.clone({
      setHeaders: {'x-access-token': token }
    });

    let that = this;
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log('status 401');

 		   location.href = "/#/login";
        }
        console.log('error', err);
      }
    });


  }






}
