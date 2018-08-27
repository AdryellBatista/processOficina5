import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule} from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContatosComponent, DialogOverviewDialogContato } from './contatos.component';
import { ContatosRoutes } from './contatos.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
      FlexLayoutModule,
    RouterModule.forChild(ContatosRoutes),
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
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
