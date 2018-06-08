import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMateriasPage } from './list-materias';

@NgModule({
  declarations: [
    ListMateriasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMateriasPage),
  ],
})
export class ListMateriasPageModule {}
