import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule} from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsuariosComponent, DialogOverviewDialog } from './usuarios.component';
import { UsuariosRoutes } from './usuarios.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
      FlexLayoutModule,
    RouterModule.forChild(UsuariosRoutes),
    FormsModule,
    ReactiveFormsModule

  ],
  entryComponents: [
    DialogOverviewDialog
  ],
  declarations: [
    UsuariosComponent,
    DialogOverviewDialog
 ]
})

export class UsuariosModule {}
