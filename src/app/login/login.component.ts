import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { GlobalsServices } from './../services/globals.services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {

  objForm:   FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private globalService: GlobalsServices,
    public  snackBar: MatSnackBar

  )
  {
    this.objForm = formBuilder.group({
      user :   ['', Validators.required],
      senha:   ['', Validators.required],
    });
  }

  logar(){
    if(this.objForm.valid){
      if(this.globalService.logar(this.objForm.value)){
        this.router.navigate(["/starter"]);
      }else{
        this.openSnackBar('Usuário ou Senha Inválidos','');
      }
    }else{
      this.openSnackBar('Campos Obrigatórios não preenchidos','');

    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
