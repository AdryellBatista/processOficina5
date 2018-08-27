import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


// const  url = "http://localhost:3001/api/";
const  url = "https://teste-oficina5-api.herokuapp.com/api/";
@Injectable()
export class GlobalsServices {
	constructor(
		private http: HttpClient
	) {}


		getUsuarios()  { return this.http.get<any>(url + "usuarios") };
		addUsuario(obj){ return this.http.post<any>(url + "usuario/add", obj)};
		updateUsuario(obj){return this.http.put<any>(url + "usuario/update/"+obj.idUser, obj)};
		deleteUsuario(id){return this.http.put<any>(url + "usuario/delete/"+id, null)};

		logar(obj){ return this.http.post<any>(url + "login", obj)};

		getApiHostUrl(){
			return url;
		}
}
