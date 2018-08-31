import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTable} from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';

import { GlobalsServices } from './../services/globals.services';
import { ContatosServices } from './../services/contatos.services';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit{
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  controlView = 1;

  arUsuarios = [];
  temp = [];
  displayedColumns: string[] = ['id', 'nome', 'telefone', 'email', 'dtNas', 'actions'];
  titleCard=""
  userLogado = JSON.parse(localStorage.getItem('USER'));
  mask = ['(', /[1-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  objFormUsuario:   FormGroup;

  constructor(
    private globalService : GlobalsServices,
    private formBuilder: FormBuilder,
    private  contatoService : ContatosServices,
    public  dialog: MatDialog,
    public  snackBar: MatSnackBar
  )
  {
    this.objFormUsuario = formBuilder.group({
      idContato    : [],
      nomeContato : ['', Validators.required],
      dtNascContato  : ['', Validators.required],
      telefoneContato  : ['', Validators.required],
      emailContato : ['', Validators.required],
    });
  }

  ngOnInit(){
    this.getContatos();
  }

  getContatos(){
    //this.arUsuarios = this.globalService.getContatos();

    this.contatoService.getContatos().subscribe(
      data=>{
        this.arUsuarios = data;
        this.temp = this.arUsuarios;
        this.table.renderRows();
        console.log(data);
      }
    );
  }

  newUser(){
    this.objFormUsuario.reset();
    this.titleCard = "Novo Contato"
    this.controlView = 2;
    this.view = true;
  }
  ngOnChanges(arUsuarios) {
      // changes.prop contains the old and the new value...
    }
  save(){
    debugger;
    if(this.objFormUsuario.valid){
      if(this.objFormUsuario.value.idContato){
        //Update
        this.contatoService.updateContato(this.objFormUsuario.value).subscribe(
          data=>{
            this.getContatos();
            this.controlView = 1;
            this.openSnackBar('Contato Editado com sucesso!','');
          },
          err=>{
            if(err.error.message){
              this.openSnackBar(err.error.message,'');
            }else{
              this.openSnackBar('Erro ao Editar contato!','');
            }
          }
        );
        // this.getContatos();
        // this.userLogado = JSON.parse(localStorage.getItem('USER'));
        // this.controlView = 1;

      }else{
        //save
        console.log(this.objFormUsuario.value);
        this.contatoService.addContato(this.objFormUsuario.value).subscribe(
          data=>{
            this.getContatos();
            this.controlView = 1;
            this.openSnackBar('Contato Salvo com sucesso!','');
          },
          err=>{
            if(err.error.message){
              this.openSnackBar(err.error.message,'');
            }else{
              this.openSnackBar('Erro ao Salvar contato!','');
            }
          }
        );

      }
    }else{
      this.openSnackBar('Campos Obrigatórios não preenchidos!','');

    }
  }
  view : boolean;
  edit(obj, view){
    this.view = view;
    this.objFormUsuario.controls['idContato'].setValue(obj.idContato);
    this.objFormUsuario.controls['nomeContato'].setValue(obj.nomeContato);
    this.objFormUsuario.controls['dtNascContato'].setValue(obj.dtNascContato);
    this.objFormUsuario.controls['telefoneContato'].setValue(obj.telefoneContato);
    this.objFormUsuario.controls['emailContato'].setValue(obj.emailContato);
    this.controlView = 2;
    this.titleCard = "Editar " + obj.nomeContato;

  }
  delete(id){

  }

  cofirmaDelete(obj){

    let dialogRef = this.dialog.open(DialogOverviewDialogContato, {
      width: '350px',
      data: { id: obj.idContato, nome: obj.nomeContato }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.contatoService.deleteContato(result).subscribe(data => {
          // console.log("Chamou? ", data);
          this.getContatos();
          this.controlView = 1;
          this.openSnackBar('Contato Excluído com sucesso!','');
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

  dataFormatada2(data){
    let dt = data.split('T')[0].split('-');
    return dt[2]+"/"+dt[1]+"/"+dt[0];
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
export class DialogOverviewDialogContato {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialogContato>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
