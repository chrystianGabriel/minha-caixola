import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController,ViewController,ToastController} from 'ionic-angular';
import {ColorPickerPage} from "../color-picker/color-picker"
import {FirebaseProvider} from "../../providers/firebase/firebase";
import  {MinhasMateriaPage} from "../minhas-materia/minhas-materia"
/**
 * Generated class for the AdicionarMateriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-adicionar-materia',
 	templateUrl: 'adicionar-materia.html',
 })
 export class AdicionarMateriaPage {

 	private nome;
 	private dias_semana;
 	private nivel;
 	private cor;
 	private seg;
 	private ter; 
 	private qua; 
 	private quin;
 	private sex;
 	private sab;
 	private dom;
 	private questoes;
 	private peso;

 	constructor(public toast:ToastController,public viewCtrl:ViewController,public database:FirebaseProvider,public popCtrl:PopoverController,public navCtrl: NavController, public navParams: NavParams) {
 		this.nome = "";
 		this.nivel = 1;
 		this.cor = '#990000';
 		this.questoes = 0;
 		this.peso = 0;
 		this.seg  = false
 		this.ter  = false
 		this.qua = false
 		this.quin = false
 		this.sex = false
 		this.sab = false
 		this.dom = false			


 	}
 	ionViewDidLoad(){
 		document.getElementById("buttonColor").style.color = this.cor
 		let ref = this
 		

 	}
 	mostrarPopover(){
 		let popover = this.popCtrl.create(ColorPickerPage);
 		popover.present();
 		popover.onDidDismiss(cor=>{
 			this.cor = cor;
 			document.getElementById("buttonColor").style.color = cor;
 		})

 	}
 	async cadastrarMateria(){
 		if(this.nome == ""  || this.questoes == "" || this.peso == ""|| (!this.seg && !this.ter && !this.qua && !this.quin && !this.sex && !this.sab && !this.dom)){
 			let toast = this.toast.create({
 				message: 'VOCÊ DEVE PREENCHER TODOS OS CAMPOS!',
 				duration: 3000,
 				position: 'top',
 				cssClass:"toastErro"
 			});
 			toast.present();
 		}else if(this.questoes < 0 || this.peso < 0 || this.peso > 3){
 			let toast = this.toast.create({
 				message: 'O NÚMERO DE QUESTÕES E O PESO NÃO DEVEM SER MENOR QUE ZERO.O PESO DA MATERIA NÃO DEVE SER MAIOR QUE 3',
 				duration: 6000,
 				position: 'top',
 				cssClass:"toastErro"
 			});
 			toast.present();
 		}else{

 			if(this.seg){
 				await this.database.cadastrarHorarios(1,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			
 			if(this.ter){
 				console.log(this.ter)
 				await this.database.cadastrarHorarios(2,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			if(this.qua){
 				console.log(this.qua)
 				await this.database.cadastrarHorarios(3,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			if(this.quin){
 				console.log(this.quin)
 				await this.database.cadastrarHorarios(4,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			if(this.sex){
 				console.log(this.sex)
 				await this.database.cadastrarHorarios(5,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}
 			if(this.sab){
 				console.log(this.sab)
 				await this.database.cadastrarHorarios(6,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}

 			if(this.dom){
 				console.log(this.dom)
 				await this.database.cadastrarHorarios(0,this.nome)
 				.then(()=>{})
 				.catch((e)=>{
 					console.log(e)
 				})
 			}

 			let ref = this;
 			await this.database.cadastrarMateria({nome:this.nome,
 				nivel:this.nivel,
 				cor:this.cor,questoes:this.questoes,peso:this.peso})
 			.then(()=>{
 				let toast = this.toast.create({
 					message: 'MATERIA CRIADA COM SUCESSO!',
 					duration: 3000,
 					position: 'top',
 					cssClass:"toastSucesso"
 				});
 				toast.present();
 				ref.navCtrl.setRoot(MinhasMateriaPage);
 			})
 			.catch((erro)=>{
 				let toast = this.toast.create({
 					message: erro,
 					duration: 3000,
 					position: 'top',
 					cssClass:"toastErro"
 				});
 				toast.present();
 			})
 		}
 		
 	}
 	
 	

 	
 	

 	cancelar(){
 		this.viewCtrl.dismiss();
 		
 	}

 }
