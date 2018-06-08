import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarMateriaPage } from './adicionar-materia';

@NgModule({
  declarations: [
    AdicionarMateriaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarMateriaPage),
  ],
})
export class AdicionarMateriaPageModule {}
