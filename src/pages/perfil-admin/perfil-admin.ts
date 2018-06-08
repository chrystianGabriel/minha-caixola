import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EnviarMensagemPage} from "../enviar-mensagem/enviar-mensagem";
import {CadastrarPage} from "../cadastrar/cadastrar";

/**
 * Generated class for the PerfilAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-admin',
  templateUrl: 'perfil-admin.html',
})
export class PerfilAdminPage {
   private cadastrarPage;
   private enviarMensagemPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.cadastrarPage = CadastrarPage
  	this.enviarMensagemPage = EnviarMensagemPage
  }
   
 


}
