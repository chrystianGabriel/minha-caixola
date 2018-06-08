import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MateriaDescricaoPage } from './materia-descricao';

@NgModule({
  declarations: [
    MateriaDescricaoPage,
  ],
  imports: [
    IonicPageModule.forChild(MateriaDescricaoPage),
  ],
})
export class MateriaDescricaoPageModule {}
