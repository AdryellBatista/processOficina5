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

		arUsuarios = [
      {id: 1, user: 'admin',   nome: 'Administrador',   senha: 'admin', tipo: 1, dtNas: new Date(1990, 9, 20)},
    	{id: 2, user: 'user',    nome: 'Usuário',         senha: 'user',  tipo: 2, dtNas: new Date(1995, 11, 30)},
			{id: 3, user: 'adryell', nome: 'Adryell Batista', senha: 'user',  tipo: 2, dtNas: new Date(1993, 5, 21)},
			{id: 4, user: 'felipe',  nome: 'Felipe',          senha: 'user',  tipo: 2, dtNas: new Date(1995, 11, 30)},

		];

		/*

			TIPO
			1 - ADMIN
			2 - USER
		*/


		// getUsuarios(){
		// 	return this.arUsuarios;
		// }
		// addUsuario(obj){
		// 	obj.id = this.arUsuarios.length + 1;
		// 	this.arUsuarios.push(obj);
		// }

		getUsuarios()  { return this.http.get<any>(url + "usuarios") };
		addUsuario(obj){ return this.http.post<any>(url + "usuario/add", obj)};
		updateUsuario(obj){return this.http.put<any>(url + "usuario/update/"+obj.idUser, obj)};
		deleteUsuario(id){return this.http.put<any>(url + "usuario/delete/"+id, null)};

		logar(obj){ return this.http.post<any>(url + "login", obj)};


		// updateUsuario(obj){
		// 	let userLogado = JSON.parse(localStorage.getItem('USER'));
		// 	for(let item in this.arUsuarios){
		// 		if(obj.id == this.arUsuarios[item].id ){
		// 			this.arUsuarios[item] = obj;
		// 			if(obj.id == userLogado.id){
		// 				localStorage.setItem('USER',JSON.stringify(this.arUsuarios[item]));
		//
		// 			}
		// 		}
		// 	}
		// 	//this.arUsuarios.push(obj);
		// }

		// deleteUsuario(id): Observable<any>{
		// 	let userLogado = JSON.parse(localStorage.getItem('USER'));
		//
		// 	this.arUsuarios.splice(id-1, 1);
		// 	if(userLogado.id == id){
		// 		localStorage.clear();
		// 		window.location.href = '/login';
		// 	}
		//
		// 	return Observable.of(this.arUsuarios);
		// 	//this.arUsuarios.push(obj);
		// }



		// logar(obj){
		// 	let retorno = false;
		// 	for(let item of this.arUsuarios){
		// 		if(obj.user == item.user && obj.senha == item.senha){
		// 			localStorage.setItem('USER',JSON.stringify(item));
		// 			retorno = true;
		// 		}
		// 	}
		// 	return retorno;
		// }

		getApiHostUrl(){
			return url;
		}
}
