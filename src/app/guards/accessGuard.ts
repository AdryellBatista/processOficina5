import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { forEach } from "@angular/router/src/utils/collection";


import { GlobalsServices } from './../services/globals.services';
/* Checa se usuário pode acessar o modulo "OFERECIMENTO" */
@Injectable()
export class AccessGuard implements CanActivate {


    constructor(
      private router: Router,
      private globalService: GlobalsServices
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = localStorage.getItem('USER');
        let valid = false;
        //let valid = true;
        if(user){
          valid = true;
        }else{
          this.router.navigate(["/login"]);
        }

        return valid;
    }

}
