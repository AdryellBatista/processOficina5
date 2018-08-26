import { Component, AfterViewInit, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

import { GlobalsServices } from './../services/globals.services';

@Component({
  selector: 'starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements AfterViewInit, OnInit{
    ngAfterViewInit(){}
    constructor(
      private globalService : GlobalsServices,
    ){}
    admin = 0
    user = 0
    arUsuarios = [];
    ngOnInit(){



      this.globalService.getUsuarios().subscribe(
        data=>{
          this.arUsuarios = data;
          for(let i of this.arUsuarios){
            // debugger;
            if(i.tipoUser == 1){
              this.admin += 1;
            }else{
              this.user += 1;
            }
          }
        }
      );
    }
}
