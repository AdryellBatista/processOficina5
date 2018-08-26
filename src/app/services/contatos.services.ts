import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { GlobalsServices } from './globals.services';


@Injectable()
export class ContatosServices {
   private url;


  constructor(
    private http: HttpClient,
    private global : GlobalsServices
  ) {this.url = this.global.getApiHostUrl();}
}
