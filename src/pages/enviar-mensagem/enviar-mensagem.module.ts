import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnviarMensagemPage } from './enviar-mensagem';

@NgModule({
  declarations: [
    EnviarMensagemPage,
  ],
  imports: [
    IonicPageModule.forChild(EnviarMensagemPage),
  ],
})
export class EnviarMensagemPageModule {}
