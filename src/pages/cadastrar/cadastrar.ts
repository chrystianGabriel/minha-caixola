import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase"

/**
 * Generated class for the CadastrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-cadastrar',
 	templateUrl: 'cadastrar.html',
 })
 export class CadastrarPage {
 	private email;
 	private senha;
 	private confirmacao_senha;
 	constructor(public toastCtrl:ToastController,public database:FirebaseProvider,public navCtrl: NavController, public navParams: NavParams) {

 	}
 	async ionViewDidEnter(){
 		
 	}	
 	cadastrar(){
 		if(this.senha == this.confirmacao_senha){
 			this.database.cadastrarUsuario(this.email,this.senha)
 			.then(()=>{
 				let toast = this.toastCtrl.create({
 					message: 'CADASTRO EFETUADO COM SUCESSO!',
 					duration: 3000,
 					position: 'top',
 					cssClass:"toastSucesso"
 				});

 				toast.present();
 			})
 			.catch((e)=>{
 				let toast = this.toastCtrl.create({
 					message: e,
 					duration: 3000,
 					position: 'top',
 					cssClass:"toastErro"
 				});

 				toast.present();
 			})
 		}else{
 			let toast = this.toastCtrl.create({
 				message: "AS SENHAS DIGITADAS DEVEM SER IGUAIS!",
 				duration: 3000,
 				position: 'top',
 				cssClass:"toastErro"
 			});

 			toast.present();
 		}
 	}
 	



 }
