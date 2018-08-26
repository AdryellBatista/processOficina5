import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule} from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContatosComponent, DialogOverviewDialogContato } from './contatos.component';
import { ContatosRoutes } from './contatos.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
      FlexLayoutModule,
    RouterModule.forChild(ContatosRoutes),
    FormsModule,
    ReactiveFormsModule

  ],
  entryComponents: [
    DialogOverviewDialogContato
  ],
  declarations: [
    ContatosComponent,
    DialogOverviewDialogContato
 ]
})

export class ContatosModule {}
