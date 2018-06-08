import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoasVindasPage } from './boas-vindas';

@NgModule({
  declarations: [
    BoasVindasPage,
  ],
  imports: [
    IonicPageModule.forChild(BoasVindasPage),
  ],
})
export class BoasVindasPageModule {}
