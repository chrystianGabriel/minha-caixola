import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";

/**
 * Generated class for the EnviarMensagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-enviar-mensagem',
 	templateUrl: 'enviar-mensagem.html',
 })
 export class EnviarMensagemPage {
 	private mensagem;
 	private titulo;
 	constructor(public modalCtrl:ModalController,public database:FirebaseProvider,public navCtrl: NavController, public navParams: NavParams) {
 	}
/*enviarMensagem(){
 		if(this.mensagem != ""){
 			
 			let not = confirm("Deseja enviar a notificação para todos os usuarios?")
 				if(not){
 					this.database.enviarMensagem(this.mensagem)
 				}
 		}else{
 			alert("É NECESSÁRIO DIGITAR UMA MENSAGEM")
 		}
 	}*/

 }
