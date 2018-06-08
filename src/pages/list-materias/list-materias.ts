import { Component } from '@angular/core';
import { IonicPage,ToastController,NavController,ViewController,NavParams} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {HorariosPage} from '../horarios/horarios';
declare var require:any;
let md5 = require("js-md5");
@IonicPage()
@Component({
	selector: 'page-list-materias',
	templateUrl: 'list-materias.html',
})
export class ListMateriasPage {

	private listMaterias;
	private materiasSelecionadas;
	constructor(public navPram:NavParams,public toastCtrl:ToastController,public database:FirebaseProvider,public nav:NavController,public viewCtrl:ViewController) {
		this.materiasSelecionadas = new Array();
	}
	async ionViewDidEnter(){

		this.listMaterias = await this.database.getListaMaterias()
		
	}
	preencherCores(){
		let cores:any = document.getElementsByClassName("cores");
		for(let i = 0; i < this.listMaterias.length;i++){
			cores[i].style.color = this.listMaterias[i].cor
		}

	}
	selecionarMateria(materia){
		this.viewCtrl.dismiss(materia)
	}
	mudou(materia){
		let key = md5(materia.nome)
		console.log()
		if(this.materiasSelecionadas[key] == undefined){
			this.materiasSelecionadas[key] = materia;

		}else{
			delete this.materiasSelecionadas[key]
			
		}
	}
	async adicionarMaterias(){
		let ref = this;
		var getMaterias = function(){
			return ref.materiasSelecionadas;
		}
		for(let key in this.materiasSelecionadas){
			await this.database.cadastrarHorarios(this.navPram.get('dia'),this.materiasSelecionadas[key].nome);
		}
		this.nav.setRoot(HorariosPage,{
			dia:this.navPram.get('dia')
		})
	}
	cancelar(){
		this.nav.setRoot(HorariosPage)
	}


}
