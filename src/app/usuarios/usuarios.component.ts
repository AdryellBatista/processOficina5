import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTable} from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';

import { GlobalsServices } from './../services/globals.services';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  controlView = 1;

  arUsuarios = [];
  temp = [];
  displayedColumns: string[] = ['id', 'nome', 'login', 'tipo', 'dtNas', 'actions'];
  titleCard=""
  userLogado = JSON.parse(localStorage.getItem('USER'));

  objFormUsuario:   FormGroup;

  constructor(
    private globalService : GlobalsServices,
    private formBuilder: FormBuilder,
    public  dialog: MatDialog,
    public  snackBar: MatSnackBar
  )
  {
    this.objFormUsuario = formBuilder.group({
      id   : [],
      user :   ['', Validators.required],
      nome :   ['', Validators.required],
      tipo :   ['', Validators.required],
      senha:   ['', Validators.required],
      dtNas:   []
    });
  }

  ngOnInit(){
    this.getUsuarios();
  }

  getUsuarios(){
    this.arUsuarios = this.globalService.getUsuarios();
    this.temp = this.arUsuarios;
  }

  newUser(){
    this.objFormUsuario.reset();
    this.titleCard = "Novo usuário"
    this.controlView = 2;
    this.view = true;
  }
  ngOnChanges(arUsuarios) {
      // changes.prop contains the old and the new value...
    }
  save(){
    if(this.objFormUsuario.valid){
      if(this.objFormUsuario.value.id){
        //Update
        this.globalService.updateUsuario(this.objFormUsuario.value);
        this.getUsuarios();
        this.userLogado = JSON.parse(localStorage.getItem('USER'));
        this.controlView = 1;
        this.openSnackBar('Usuário Editado com sucesso!','');

      }else{
        //save
        this.globalService.addUsuario(this.objFormUsuario.value);
        this.getUsuarios();
        this.controlView = 1;
        this.openSnackBar('Usuário Salvo com sucesso!','');

      }
    }else{
      this.openSnackBar('Campos Obrigatórios não preenchidos!','');

    }
  }
  view : boolean;
  edit(obj, view){
    this.view = view;
    this.objFormUsuario.controls['id'].setValue(obj.id);
    this.objFormUsuario.controls['user'].setValue(obj.user);
    this.objFormUsuario.controls['nome'].setValue(obj.nome);
    this.objFormUsuario.controls['tipo'].setValue(obj.tipo);
    this.objFormUsuario.controls['senha'].setValue(obj.senha);
    this.objFormUsuario.controls['dtNas'].setValue(obj.dtNas);
    this.controlView = 2;
    this.titleCard = "Editar " + obj.nome;

  }
  delete(id){

  }

  cofirmaDelete(obj){

    let dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '350px',
      data: { id: obj.id, nome: obj.nome }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.globalService.deleteUsuario(result).subscribe(data => {
          this.getUsuarios();
          this.controlView = 1;
          this.openSnackBar('Usuário Excluído com sucesso!','');
          this.table.renderRows();

       });
      }

    });
  }

  filter(event) {
    const val = event.target.value;
    // debugger;
    const temp = this.temp.filter(function (d) {
      for (var i in d) { //i=> coluna, d=> array de dados
        if (d[i] != null ) {
          if(i == 'dtNas'){
            var dia = d[i].getDate();
            if (dia.toString().length == 1)
              dia = "0"+dia;
            var mes = d[i].getMonth()+1;
            if (mes.toString().length == 1)
              mes = "0"+mes;
            var ano = d[i].getFullYear();
            let data = dia+"/"+mes+"/"+ano;
            //let data = that.dataFormatada(d[i]);
            var result = data.toLowerCase().indexOf(val.toLowerCase()) !== -1 || !val.toLowerCase();
          }else{
            d[i] = String(d[i]);
            var result = d[i].toLowerCase().indexOf(val.toLowerCase()) !== -1 || !val.toLowerCase();

          }
        }

        if (result) {
          return result;

        }
      }
    });

    this.arUsuarios = temp;
    this.table.renderRows();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  //ACORDION
  panelOpenState: boolean = false;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  dataFormatada(data){
    var dia = data.getDate();
    if (dia.toString().length == 1)
      dia = "0"+dia;
    var mes = data.getMonth()+1;
    if (mes.toString().length == 1)
      mes = "0"+mes;
    var ano = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
    // return data;
  }
  //ACORDION
}



@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Excluir </h1>
<div mat-dialog-content>
  <p>Tem certeza que deseja excluir {{data.nome}}?</p>

</div>
<div mat-dialog-actions class="text-center">
  <button mat-button (click)="onNoClick()" tabindex="-1">Cancelar</button>
  <button mat-button color="warn" [mat-dialog-close]="data.id" tabindex="2">Excluir</button>

</div>`
})
export class DialogOverviewDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
