import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController,ViewController  } from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
/**
 * Generated class for the GravarEstudosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 let pause = false;
 declare var cronometro:any; // essa variavel é declarada no index.html globalmente
 @IonicPage()
 @Component({
 	selector: 'page-gravar-estudos',
 	templateUrl: 'gravar-estudos.html',
 })
 export class GravarEstudosPage {
 	private tipoTempo;
 	private tipoEstudo;
 	private materia;
 	private array_materias;
 	private data;
 	private revisoes;
 	private dataAtual;
 	private descricao;
 	private tema;
 	private tempo;
 	private hora;
 	private minuto;
 	private alerta;
 	private exercicios;
 	private acertos;
 	constructor(private backgroundMode: BackgroundMode,private localNotifications: LocalNotifications,private viewCtrl:ViewController,private alertCtrl:AlertController,private database:FirebaseProvider,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {

 		this.tipoEstudo = "teoria"
 		this.materia = "0"
 		this.tipoTempo = "cronometro"
 		this.revisoes = "nao"
 		this.descricao = "";
 		this.tema= ""
 		this.hora = ""
 		this.minuto = ""
 		this.alerta = false;
 		this.exercicios = 0;
 		this.acertos = 0;
 		let aux = new Date()
 		this.dataAtual = aux.getFullYear()
 		if(aux.getMonth() < 9){
 			this.dataAtual += "-0" + (aux.getMonth()+1)
 		}else{
 			this.dataAtual += "-" + (aux.getMonth()+1)
 		}
 		if (aux.getDate() < 10){
 			this.dataAtual += "-0" + (aux.getDate())
 		}else{
 			this.dataAtual += "-" + (aux.getDate())
 		}
 		
 		this.data = this.dataAtual

 		



 	}

 	async ionViewDidEnter(){
 		
 		this.array_materias = await this.database.getListaMaterias();

 	}
 	iniciarEstudo(){

 		if(cronometro == undefined){

 			this.tempo = ""
 			var s = 1;
 			var m = 0;
 			var h = 0;
 			let ref = this;
 			console.log(cronometro)
 			cronometro = setInterval(function(){
 				if(!pause){
 					let a:any = document.getElementById("btnIniciar")
 					a.name = "pause"
 					document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Pausar</strong>"
 					ref.tempo = ""
 					if (s == 60) { m++; s = 0; }
 					if (m == 60) { h++; s = 0; m = 0; }
 					if (h < 10) ref.tempo +=  "0" + h + ":"; else ref.tempo += h + ":";
 					if (m < 10) ref.tempo += "0" + m + ":"; else ref.tempo += m + ":";
 					if (s < 10) ref.tempo += "0" + s; else ref.tempo += s;	
 					s++;
 					document.getElementById("tempo").innerHTML = ref.tempo
 				}
 			},1000)


 		}else{
 			pause = !pause
 			let a:any = document.getElementById("btnIniciar")
 			a.name = "pause"
 			document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Retomar</strong>"
 		}
 	}
 	async gravar(){
 		if(this.materia != "0"){
 			if(this.tipoTempo == "cronometro"){
 				let tempo = this.tempo.split(":")
 				if(parseInt(tempo[1]) < 1){
 					let ref = this
 					let toast = this.toastCtrl.create({
 						message: "É NESCESSARIO ESTUDAR AO MENOS 1 MINUTO PARA PODER GRAVA-LO",
 						duration: 3000,
 						position: 'top',
 						cssClass:"toastErro"
 					});
 					toast.present();
 					return;
 				}else{
 					clearInterval(cronometro)
 					cronometro = undefined
 					let a:any = document.getElementById("btnIniciar")
 					a.name = "play"
 					document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Iniciar</strong>"


 				}
 				
 			}else{
 				if(this.minuto > 1){
 					this.tempo = this.hora + ":" + this.minuto + ":00"
 				}else{
 					let ref = this
 					let toast = this.toastCtrl.create({
 						message: "É NESCESSARIO ESTUDAR AO MENOS 1 MINUTO PARA PODER GRAVA-LO",
 						duration: 3000,
 						position: 'top',
 						cssClass:"toastErro"
 					});
 					toast.present();
 					return;
 				}
 			}
 			if(this.revisoes == "sim"){
 				if(this.tema !=""){
 					await this.database.cadastrarRevisoes(this.materia,this.tema,this.data)
 					.catch((erro)=>{
 						let ref = this
 						let toast = this.toastCtrl.create({
 							message: erro,
 							duration: 3000,
 							position: 'top',
 							cssClass:"toastErro"
 						});
 						toast.present();
 					});
 					this.database.cadastrarEstudo({tempo:this.tempo,tipo:this.tipoEstudo,tema:this.tema,descricao:this.descricao,revisao:this.revisoes,exercicios:this.exercicios,acertos:this.acertos},this.data,this.materia)
 					.then(()=>{
 						let ref = this
 						let toast = this.toastCtrl.create({
 							message: "TEMPO DE ESTUDO SALVO COM SUCESSO!",
 							duration: 3000,
 							position: 'top',
 							cssClass:"toastSucesso"
 						});
 						toast.present();
 					})
 					.catch((erro)=>{
 						let ref = this
 						let toast = this.toastCtrl.create({
 							message: erro,
 							duration: 3000,
 							position: 'top',
 							cssClass:"toastErro"
 						});
 						toast.present();

 					})
 				}else{
 					let alertAux = this.alertCtrl.create({
 						title:"Ops! :(",
 						message:"É NESCESSARIO INSERIR UM TEMA PARA PODER CRIAR REVISÕES!",
 						cssClass:"alerta"
 					})
 					alertAux.present();
 					pause = true;
 				}

 			}else{
 				this.database.cadastrarEstudo({tempo:this.tempo,tipo:this.tipoEstudo,tema:this.tema,descricao:this.descricao,revisao:this.revisoes,exercicios:this.exercicios,acertos:this.acertos},this.data,this.materia)
 				.then(()=>{
 					let ref = this
 					let toast = this.toastCtrl.create({
 						message: "TEMPO DE ESTUDO SALVO COM SUCESSO!",
 						duration: 3000,
 						position: 'top',
 						cssClass:"toastSucesso"
 					});
 					toast.present();
 				})
 				.catch((erro)=>{
 					let ref = this
 					let toast = this.toastCtrl.create({
 						message: erro,
 						duration: 3000,
 						position: 'top',
 						cssClass:"toastErro"
 					});
 					toast.present();

 				})
 			}

 			
 			
 		}else{
 			let alertAux = this.alertCtrl.create({
 				title:"Ops! :(",
 				message:"É NESCESSARIO SELECIONAR UMA MATERIA PARA GRAVAR O ESTUDO!",
 				cssClass:"alerta"
 			})
 			alertAux.present();
 			pause = true;
 		}
 		
 	}
 	cancelar(){

 		let alertAux = this.alertCtrl.create({
 			title:"ATENÇÃO",
 			message:"TEM CERTEZA QUE DESEJA CANCELAR?",
 			cssClass:"alerta",
 			buttons:[{
 				text: 'SIM',
 				handler: ()=>{
 					clearInterval(cronometro)
 					cronometro = undefined
 					let a:any = document.getElementById("btnIniciar")
 					a.name = "play"
 					document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Iniciar</strong>"
 					document.getElementById("tempo").innerHTML =  "00:00:00"
 					this.tipoEstudo = "teoria"
 					this.materia = "0"
 					this.tipoTempo = "cronometro"
 					this.revisoes = "sim"
 					this.descricao = "";
 					this.tema= ""
 					this.hora = ""
 					this.minuto = ""
 					this.alerta = false;
 					this.exercicios = 0;
 					this.acertos = 0;
 				}
 			},
 			{
 				text:"NÃO",
 				role: 'cancel'
 				
 			}]
 		})
 		alertAux.present();
 	}
 	programarAlerta(alerta){
 		if(this.alerta){
 			let alertAux = this.alertCtrl.create({
 				title:"Criar Alerta?",
 				message:"DIGITE OS MINUTOS PARA QUE VOCÊ SEJA NOTIFICADO!",
 				inputs:[
 				{
 					name:"minutos",
 					placeholder:"Minutos",
 					type:"number",
 					max:"2"
 				}

 				],
 				buttons:[
 				{
 					text:"Salvar",
 					role:"save"
 				},
 				{
 					text:"Cancelar",
 					role:"cancel"
 				}

 				],
 				cssClass:"alerta"
 			})
 			alertAux.present();
 			alertAux.onDidDismiss(dados=>{

 				if(dados.minutos == ""){
 					let alertAux = this.alertCtrl.create({
 						title:"ATENÇÃO",
 						message:"VOCÊ NÃO DIGITOU NENHUM TEMPO!"
 					})
 					alertAux.present()
 					alert()
 				}if(cronometro == undefined){
 					let alertAux = this.alertCtrl.create({
 						title:"ATENÇÃO",
 						message:"VOCÊ DEVE DISPARAR O CRONOMETRO PRIMEIRO ANTES DE INICIAR O ALARME!"
 					})
 					alertAux.present()
 				}else{
 					let tempo = new Date(new Date().getTime() + Number(dados.minutos)*60000);
 					let alarme = {
 						id: 1,
 						title:"Caixola Estudos",
 						text: 'Fim dos Estudos!!',
 						trigger: {at: tempo},
 						vibrate: true


 					}
 					this.localNotifications.schedule(alarme);
 					let ref = this
 					let toast = this.toastCtrl.create({
 						message: "ALARME CRIADO COM SUCESSO!",
 						duration: 3000,
 						position: 'top',
 						cssClass:"toastSucesso"
 					});
 					toast.present()
 					.then(()=>{
 						setTimeout(()=>{
 							ref.backgroundMode.wakeUp();
 						},Number(dados.minutos)*60000);
 					});


 				}
 			})
 		}
 	}
 }
