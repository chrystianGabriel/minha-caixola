import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {BoasVindasPage} from '../boas-vindas/boas-vindas'
import { AdicionarMateriaPage } from '../adicionar-materia/adicionar-materia';
import {PerfilAdminPage} from "../perfil-admin/perfil-admin";
import {IntroPage} from "../intro/intro";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var require:any;
 @IonicPage()
 @Component({
 	selector: 'page-login',
 	templateUrl: 'login.html',
 })
 export class LoginPage {
 	private email;
 	private senha;
 	constructor(private database:FirebaseProvider,private loadCtrl:LoadingController,private toast:ToastController,public navCtrl: NavController, public navParams: NavParams) {
 		this.email = ""
 		this.senha = ""
 	}
 	ionViewDidLoad(){
 	}
 	async login(){
 		
 	 	let ref = this;
 	 	let load = this.loadCtrl.create({content:"EFETUANDO LOGIN"})
 	 	load.present()
 	 	// this.email != "" && this.senha != ""
 		if(this.email != "" && this.senha != ""){
 			// "chrystiangabriel1@hotmail.com","moncerrat"
 			 this.database.login(this.email,this.senha)
 			.then(async function(){
 				let toast = ref.toast.create({
 					message: 'LOGIN EFETUADO COM SUCESSO!',
 					duration: 3000,
 					position: 'top',
 					cssClass:"toastSucesso"
 				});
 				load.dismiss();
 				toast.present();
 				let uid = ref.database.getUsuario();
 				if(uid == "0PbBHDIWiQTUXMW1MkHduD9fPxp1"){
 					ref.navCtrl.push(PerfilAdminPage)
 				}else{
 					let materias:any = await ref.database.getListaMaterias();
 						ref.navCtrl.push(BoasVindasPage)
 				}
 			})
 			.catch(function(erro){
 				let toast = ref.toast.create({
 					message: erro,
 					duration: 3000,
 					position: 'top',
 					cssClass:"toastErro"
 				});
 				load.dismiss();
 				toast.present();

 			})
 		}else{
 			let toast = this.toast.create({
 					message: 'TODOS OS CAMPOS SÃO OBRIGATORIOS!',
 					duration: 3000,
 					position: 'top',
 					cssClass:"toastErro"
 				});
 			toast.present();
 			load.dismiss()
 		}
 	}
 	async esqueciASenha(){
 		let e  = prompt("INISIRA O E-MAIL DE CADASTRO:")
 		if(e != null){
 			let a = await this.database.equeciMinhaSenha(e)
 			if(a){
 				let toast = this.toast.create({
 					message: 'E-MAIL ENVIADO COM SUCESSO',
 					duration: 3000,
 					position: 'top',
 					cssClass:"toastSucesso"
 				});
 				toast.present();
 			}else{
 				let toast = this.toast.create({
 					message: 'E-MAIL NÃO CADASTRADO!',
 					duration: 3000,
 					position: 'top',
 					cssClass:"toastErro"
 				});
 				toast.present();
 			}
 		}
 		
 	}

 }
