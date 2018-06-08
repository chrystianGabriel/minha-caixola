import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GravarEstudosPage } from './gravar-estudos';

@NgModule({
  declarations: [
    GravarEstudosPage,
  ],
  imports: [
    IonicPageModule.forChild(GravarEstudosPage),
  ],
})
export class GravarEstudosPageModule {}
