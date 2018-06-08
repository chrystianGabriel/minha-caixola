import { Component } from '@angular/core';
import { ToastController,ModalController,LoadingController} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {GravarEstudosPage} from '../../pages/gravar-estudos/gravar-estudos';
// import introJs from '../../../node_modules/intro.js/intro.js';
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private listMaterias;
	private dataAtual;
	private materia_mais_estudada;
	private materia_menos_estudada;
	private materia_mais_acertos;
	private materia_menos_acertos;
	private tutorial;
	constructor(public loadCtrl:LoadingController,public database:FirebaseProvider,public toastCtrl:ToastController,public modalCtrl:ModalController) {
		let aux = new Date()
		this.dataAtual = ""
		if (aux.getDate() < 10){
			this.dataAtual = "0" + aux.getDate()
		}else{
			this.dataAtual += aux.getDate()
		}
		if(aux.getMonth() < 9){
			let num = aux.getMonth() + 1
			this.dataAtual += "/0" + num
		}else{
			let num = aux.getMonth() + 1
			this.dataAtual += "/" + num
		}
		this.dataAtual += "/" + aux.getFullYear()
		this.materia_mais_estudada = {tempoLabel:"--:--",tempo:Number.MIN_VALUE,nome:"-"}
		this.materia_menos_estudada = {tempoLabel:"--:--",tempo:Number.MAX_VALUE,nome:"-"}
		this.materia_menos_acertos = {porcentagemLabel:"--",porcentagem:Number.MAX_VALUE,nome:"--"}
		this.materia_mais_acertos = {porcentagemLabel:"--",porcentagem:Number.MIN_VALUE,nome:"--"}
	}
	async ionViewDidEnter(){
		let ref = this
		let load = ref.loadCtrl.create({content:"CARREGANDO INFORMAÇÕES, POR FAVOR, AGUARDE!"})
		load.present();
		let data = new Date();
		ref.listMaterias = await ref.database.getMateriasDiaSemana(new Date().getDay());

		let dia_atual = new Date().getFullYear() + "-" + ((new Date().getMonth()+1) < 10? "0" + (new Date().getMonth()+1):(new Date().getMonth()+1)) + "-" + (new Date().getDate() < 10? "0" + new Date().getDate():new Date().getDate())
		let porcentagem;
		for(let i = 0; i < ref.listMaterias.length;i++){
			let estudos:any = await ref.database.getEstudosData(ref.listMaterias[i].nome,dia_atual);
			if(estudos){

				let tempo = estudos.tempo.split(":");
				tempo = parseInt(tempo[0]) + parseInt(tempo[1])/60
				if(estudos.exercicios != "" && estudos.acertos != ""){
					porcentagem = ((parseInt(estudos.acertos)*100)/parseInt(estudos.exercicios)).toFixed(0)
				}

				if(tempo > ref.materia_mais_estudada.tempo){
					ref.materia_mais_estudada.tempoLabel = estudos.tempo
					ref.materia_mais_estudada.tempo = tempo
					ref.materia_mais_estudada.nome = ref.listMaterias[i].nome

				}
				if(tempo < ref.materia_menos_estudada.tempo){
					ref.materia_menos_estudada.tempoLabel = estudos.tempo
					ref.materia_menos_estudada.tempo = tempo
					ref.materia_menos_estudada.nome = ref.listMaterias[i].nome

				}
				if(porcentagem > ref.materia_mais_acertos.porcentagem){
					ref.materia_mais_acertos.porcentagemLabel = porcentagem + "%"
					ref.materia_mais_acertos.porcentagem = porcentagem
					ref.materia_mais_acertos.nome = ref.listMaterias[i].nome
				}
				if(porcentagem < ref.materia_menos_acertos.porcentagem){
					ref.materia_menos_acertos.porcentagemLabel = porcentagem + "%"
					ref.materia_menos_acertos.porcentagem = porcentagem
					ref.materia_menos_acertos.nome = ref.listMaterias[i].nome
				}
			}

		}
		load.dismiss()
		this.tutorial = true;
		


		// this.database.login('usuario@usuario.com','usuario123')
		// .then(async function(){
		// 	console.log("logoooouuu")




		// })
		// .catch(function(erro){
  //      // let toast = this.toast.create({
  //      //   message: erro,
  //      //   duration: 3000,
  //      //   position: 'top',
  //      //   cssClass:"toastErro"
  //      // });
  //      // toast.present();
  //  })





}
preencherCores(){
	let cores:any = document.getElementsByClassName("cores");
	for(let i = 0; i < this.listMaterias.length;i++){
		cores[i].style.color = this.listMaterias[i].cor
	}

}
iniciarEstudos(){
	let modal = this.modalCtrl.create(GravarEstudosPage);
	modal.present();
}



}
