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


  getContatos()  { return this.http.get<any>(this.url + "contatos") };
  addContato(obj){ return this.http.post<any>(this.url + "contato/add", obj)};
  updateContato(obj){return this.http.put<any>(this.url + "contato/update/"+obj.idContato, obj)};
  deleteContato(id){return this.http.put<any>(this.url + "contato/delete/"+id, null)};
}
