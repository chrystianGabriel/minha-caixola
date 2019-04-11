import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,ModalController,ViewController} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {MateriaDescricaoPage} from "../materia-descricao/materia-descricao";
import {IntroPage} from "../intro/intro";
/**
 * Generated class for the RelatorioMateriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-relatorio-materia',
 	templateUrl: 'relatorio-materia.html',
 })
 export class RelatorioMateriaPage {
 	private data;
 	private array_estudos;
 	private nome_materia;
 	private cor;
 	private tempoTotal;
 	constructor(public viewCtrl:ViewController,public modalCtrl:ModalController,public database:FirebaseProvider,public navCtrl: NavController, public navParams: NavParams,public toast:ToastController) {
 		let aux = new Date()
 		this.data = aux.getFullYear()
 		if (aux.getDate() < 10){
 			this.data = "-0" + aux.getDate()
 		}else{
 			this.data += "-" + aux.getDate()
 		}
 		if(aux.getMonth() < 9){
 			let num = aux.getMonth() + 1
 			this.data += "-0" + num
 		}else{
 			let num = aux.getMonth() + 1
 			this.data += "-" + num
 		}
 		this.nome_materia = this.navParams.get('nome_materia')
 		this.cor = this.navParams.get('cor_materia')
 	}

 	async ionViewDidEnter() {
 		this.array_estudos = await this.database.getEstudos(this.nome_materia);
 		console.log(this.array_estudos)
 		let header:any = document.getElementsByClassName("destacar")
 		header[0].style.background = this.cor
 		header[1].style.background = this.cor
 		header[2].style.background = this.cor
 		header[3].style.background = this.cor
 		header[4].style.background = this.cor
 		this.tempoTotal = this.calcularTempoTotalDeEstudos();
 		
 	}
 	calcularTempoTotalDeEstudos(){
 		let hora:any  = 0
 		let minutos:any = 0
 		let segundos:any = 0;
 		for(let key in this.array_estudos){
 			let estudoAnterior = this.array_estudos[key]
 			let tempoAnterior = estudoAnterior.tempo.split(":");
 			hora += Number(tempoAnterior[0])
 			minutos += Number(tempoAnterior[1])
 			segundos += Number(tempoAnterior[2])
 			hora += Math.round(minutos/60)
 			minutos += Math.round(segundos/60)
 		}
 		if(hora < 10){
 			hora = "0" + hora.toString();

 		}
 		if(minutos < 10){
 			minutos = "0" + minutos.toString();

 		}
 		if(segundos < 10){
 			segundos = "0" + segundos.toString();
 		}
 		let tempoTotal = hora + ":" + minutos + ":" + segundos
 		return tempoTotal;
 	}
 	verDescricao(descricacao){
 		let modal = this.modalCtrl.create(MateriaDescricaoPage,{descricao:descricacao})
 		modal.present();
 	}
 	abrirTutorial(){
     let modal = this.modalCtrl.create(IntroPage,{imgs:[{src:"t_relatorios_1.png"}]});
     modal.present();
   }
   fecharModal(){
   		this.viewCtrl.dismiss();
   }
 	

 }
