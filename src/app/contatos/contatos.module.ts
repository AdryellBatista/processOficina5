import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule} from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContatosComponent, DialogOverviewDialog } from './contatos.component';
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
    DialogOverviewDialog
  ],
  declarations: [
    ContatosComponent,
    DialogOverviewDialog
 ]
})

export class ContatosModule {}
