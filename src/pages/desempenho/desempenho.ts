import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import {FirebaseProvider} from '../../providers/firebase/firebase'
/**
 * Generated class for the DesempenhoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 let i = 0;
 @IonicPage()
 @Component({
 	selector: 'page-desempenho',
 	templateUrl: 'desempenho.html',
 })
 export class DesempenhoPage {
 	@ViewChild('graficoSemanal') graficoSemana;
 	@ViewChild('graficoDiario') graficoDia;
 	@ViewChild('graficoGeral') graficoGera;
 	desempenhoSemana:any;
 	private desempenhoDiario;
 	private dados;
 	private tipo;
 	private labels;
 	private datasets;
 	private  intervalo;
 	constructor(public loadCtrl:LoadingController,public database:FirebaseProvider,public navCtrl: NavController, public navParams: NavParams) {
 		this.tipo = "bar"
 		this.labels = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sabado"];
 		this.intervalo = "semanal"
 		this.desempenhoDiario = undefined
 	}

 	async ionViewDidEnter() {
 		
 		await this.graficoDiario()
 		await this.graficoGeral()
 		await this.graficoSemanal()
 		await this.graficoDiario()
 		

 	}


 	getDatasSemana(){
 		let dia = new Date().getDate() + (6 - new Date().getDay())
 		console.log(dia)
 		let mes = new Date().getMonth() + 1;
 		let ano = new Date().getFullYear();
 		if(mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12){
 			let datas_semana = [ano + (mes < 10 ? "-0":"-")  + (dia-6 > 31 ? mes+1:mes) + (dia-6 < 10 || dia-6 > 31 ? "-0":"-") + (dia-6 > 31 ? (dia-31)-6:dia-6),
 			ano + (mes < 10 ? "-0":"-") + (dia-5 > 31 ? mes+1:mes) + (dia-5 < 10 || dia-5 > 31  ? "-0":"-")  + (dia-5 > 31 ? (dia-31)-5:dia-5),
 			ano + (mes < 10 ? "-0":"-") + (dia-4 > 31 ? mes+1:mes) + (dia-4 < 10 || dia-4 > 31  ? "-0":"-")  + (dia-4 > 31 ? (dia-31)-4:dia-4),
 			ano + (mes < 10 ? "-0":"-") + (dia-3 > 31 ? mes+1:mes) + (dia-3 < 10 || dia-3 > 31  ? "-0":"-")  + (dia-3 > 31 ? (dia-31)-3:dia-3),
 			ano + (mes < 10 ? "-0":"-") + (dia-2 > 31 ? mes+1:mes) + (dia-2 < 10 || dia-2 > 31  ? "-0":"-")  + (dia-2 > 31 ? (dia-31)-2:dia-2),
 			ano + (mes < 10 ? "-0":"-") + (dia-1 > 31 ? mes+1:mes) + (dia-1 < 10 || dia-1 > 31  ? "-0":"-")  + (dia-1 > 31 ? (dia-31)-1:dia-1),
 			ano + (mes < 10 ? "-0":"-") + (dia > 31 ? mes+1:mes) + (dia < 10  || dia > 31 ? "-0":"-")  + (dia > 31 ? (dia-31):dia)]
 			return datas_semana;
 		}else if(mes == 4 || mes == 6 || mes == 9 || mes == 11){
 			let datas_semana = [ano + (mes < 10 ? "-0":"-") + (dia-6 > 30 ? mes+1:mes) + (dia-6 < 10 || dia-6 > 30 ? "-0":"-") + (dia-6 > 30 ? (dia-30)-6:dia-6),
 			ano + (mes < 10 ? "-0":"-") + (dia-5 > 30 ? mes+1:mes) + (dia-5 < 10 || dia-5 > 30 ? "-0":"-") + (dia-5 > 30 ? (dia-30)-5:dia-5),
 			ano + (mes < 10 ? "-0":"-") + (dia-4 > 30 ? mes+1:mes) + (dia-4 < 10 || dia-4 > 30 ? "-0":"-") + (dia-4 > 30 ? (dia-30)-4:dia-4),
 			ano + (mes < 10 ? "-0":"-") + (dia-3 > 30 ? mes+1:mes) + (dia-3 < 10 || dia-3 > 30 ? "-0":"-") + (dia-3 > 30 ? (dia-30)-3:dia-3),
 			ano + (mes < 10 ? "-0":"-") + (dia-2 > 30 ? mes+1:mes) + (dia-2 < 10 || dia-2 > 30 ? "-0":"-") + (dia-2 > 30 ? (dia-30)-2:dia-2),
 			ano + (mes < 10 ? "-0":"-") + (dia-1 > 30 ? mes+1:mes) + (dia-1 < 10 || dia-1 > 30 ? "-0":"-") + (dia-1 > 30 ? (dia-30)-1:dia-1),
 			ano + (mes < 10 ? "-0":"-") + (dia > 30 ? mes+1:mes) + (dia < 10 || dia > 30 ? "-0":"-") + (dia > 30 ? (dia-30):dia)]
 			return datas_semana;

 		}else if(new Date(ano,1,29).getMonth() != 1){
 			let datas_semana = [ano + (mes < 10 ? "-0":"-") + (dia-6 > 28 ? mes+1:mes) + (dia-6 < 10 || dia-6 > 28 ? "-0":"-") + (dia-6 > 28 ? (dia-28)-6:dia-6),
 			ano + (mes < 10 ? "-0":"-") + (dia-5 > 28 ? mes+1:mes) + (dia-5 < 10 || dia-5  > 28 ? "-0":"-") + (dia-5 > 28 ? (dia-28)-5:dia-5),
 			ano +(mes < 10 ? "-0":"-") + (dia-4 > 28 ? mes+1:mes) +  (dia -4< 10 || dia -4 > 28 ? "-0":"-") + (dia-4 > 28 ? (dia-28)-4:dia-4),
 			ano + (mes < 10 ? "-0":"-") + (dia-3 > 28 ? mes+1:mes) + (dia-3 < 10 || dia-3  > 28 ? "-0":"-") + (dia-3 > 28 ? (dia-28)-3:dia-3),
 			ano + (mes < 10 ? "-0":"-") + (dia-2 > 28 ? mes+1:mes) + (dia-2 < 10 || dia-2  > 28 ? "-0":"-") + (dia-2 > 28 ? (dia-28)-2:dia-2),
 			ano + (mes < 10 ? "-0":"-") + (dia-1 > 28 ? mes+1:mes) + (dia-1 < 10 || dia-1  > 28 ? "-0":"-") + (dia-1 > 28 ? (dia-28)-1:dia-1),
 			ano + (mes < 10 ? "-0":"-") + (dia > 28 ? mes+1:mes) + (dia < 10 || dia > 28 ? "-0":"-") + (dia > 28 ? (dia-28):dia)]
 			return datas_semana;
 		}else{
 			let datas_semana = [ano + (mes < 10 ? "-0":"-") + (dia-6 > 29 ? mes+1:mes) + (dia-6 < 10  || dia-6 > 29? "-0":"-") + (dia-6 > 29 ? (dia-29)-6:dia-6),
 			ano + (mes < 10 ? "-0":"-") + (dia-5 > 29 ? mes+1:mes) + (dia-5 < 10 ? "-0":"-") + (dia-5 > 29 ? (dia-29)-5:dia-5), 
 			ano + (mes < 10 ? "-0":"-") + (dia-3 > 29 ? mes+1:mes) + (dia-3 < 10 ? "-0":"-") + (dia-3 > 29 ? (dia-29)-3:dia-3),
 			ano + (mes < 10 ? "-0":"-") + (dia-2 > 29 ? mes+1:mes) + (dia-2 < 10 ? "-0":"-") + (dia-2 > 29 ? (dia-29)-2:dia-2),
 			ano + (mes < 10 ? "-0":"-") + (dia-1 > 29 ? mes+1:mes) + (dia-1 < 10 ? "-0":"-") + (dia-1 > 29 ? (dia-29)-1:dia-1),
 			ano + (mes < 10 ? "-0":"-") + (dia > 29 ? mes+1:mes) + (dia < 10 ? "-0":"-") + (dia > 29 ? (dia-29):dia)]
 			return datas_semana;
 		}
 	}

 	async graficoSemanal(){
 		let materias:any = await this.database.getListaMaterias();
 		let estudos = new Array();
 		let dias_semana:any = this.getDatasSemana();
 		let datasets = new Array();
 		for(let i = 0; i < materias.length;i++){
 			for(let j = 0; j < dias_semana.length;j++){
 				let estudo:any = await this.database.getEstudosData(materias[i].nome,dias_semana[j])
 				if(estudo){
 					estudo.nome = materias[i].nome
 					estudo.cor = materias[i].cor
 					let aux = dias_semana[j].split("-")
 					estudo.index = new Date(parseInt(aux[0]),parseInt(aux[1])-1,parseInt(aux[2])).getDay()
 					datasets[estudo.nome] = {
 						data:[],
 						label:estudo.nome,
 						backgroundColor:materias[i].cor,
 						borderColor:"black",
 						borderWidth: 1
 					}
 					estudos.push(estudo)

 				}

 			}
 		}
 		if(estudos.length > 0){
 			this.desempenhoDiario = "liberado"
 			let nome = estudos[0].nome
 			for(let k = 0; k < estudos.length;k++){
 				for(let key in datasets){
 					if(key == estudos[k].nome){
 						let tempo = estudos[k].tempo.split(":");

 						datasets[estudos[k].nome].data[estudos[k].index] = ((parseFloat(tempo[0]) + (parseFloat(tempo[1])/60)).toFixed(2))
 					}else{
 						datasets[estudos[k].nome].data.push(0)
 					}
 				}


 			}

 			let canvas:any = document.getElementsByTagName("canvas")
 			
 			if(canvas[1] != undefined){
 				canvas[1].style.width = "100%";
 				let carregamento:any = document.getElementsByClassName("carregamento")[1]
 				carregamento.style.display = "none"
 				this.desempenhoSemana = new Chart(this.graficoSemana.nativeElement,{
 					type:this.tipo,
 					data:{
 						labels:this.labels,
 						datasets:[]

 					},
 					options: {
 						scales: {
 							yAxes: [{
 								ticks: {
 									beginAtZero:true,
 									callback: function(label,index,labels){
 										let tempo = label.toString().split(".")
 										let hora = tempo[0]
 										let minutos = (parseFloat("0." + tempo[1])*60).toFixed(0).toString();

 										if(parseInt(hora) < 10){
 											hora = "0" + hora;
 										}
 										if(parseInt(minutos) < 10){
 											minutos = "0" + minutos.toString()
 										}
 										return hora + ":" + minutos + ":00"
 									}

 								}
 							}]
 						},
 						tooltips: {
 							callbacks: {
 								label: function(tooltipItem,data) {

 									let tempo = tooltipItem.yLabel.toString().split(".")
 									let hora = tempo[0]
 									let minutos = (parseFloat("0." + tempo[1])*60).toFixed(0).toString();

 									if(parseInt(hora) < 10){
 										hora = "0" + hora;
 									}
 									if(parseInt(minutos) < 10){
 										minutos = "0" + minutos.toString()
 									}
 									return  data.datasets[tooltipItem.datasetIndex].label + ": " + hora + ":" + minutos + ":00"


 								}
 							}
 						}
 					}
 				})
 				for(let key in datasets){
 					this.desempenhoSemana.data.datasets.push(datasets[key]) 			
 				}

 				this.desempenhoSemana.update();
 			}

 		}


 	}
 	async graficoDiario(){

 		let data_atual = this.getDatasSemana()[new Date().getDay()]
 		let materias:any = await this.database.getListaMaterias();
 		let datasets = [{
 			data:[],
 			label:[],
 			backgroundColor:[],
 			borderColor:"black",
 			borderWidth: 1
 		}]

 		let estudos = []
 		for(let i = 0; i < materias.length;i++){

 			let estudo:any = await this.database.getEstudosData(materias[i].nome,data_atual)
 			if(estudo){
 				estudo.nome = materias[i].nome
 				estudo.cor = materias[i].cor
 				let aux = data_atual.split("-")
 				estudo.index = new Date(parseInt(aux[0]),parseInt(aux[1])-1,parseInt(aux[2])).getDay()
 				datasets[0].label.push(estudo.nome)
 				datasets[0].backgroundColor.push(estudo.cor)
 				estudos.push(estudo)

 			}


 		}

 		if(estudos.length > 0){
 			this.desempenhoDiario = "liberado"
 			for(let k = 0; k < estudos.length;k++){
 				let tempo = estudos[k].tempo.split(":");
 				datasets[0].data.push(((parseFloat(tempo[0]) + (parseFloat(tempo[1])/60)).toFixed(2)))

 			}
 			let canvas:any = document.getElementsByTagName("canvas")
 			if(canvas[0] != undefined){
 				canvas[0].style.width = "100%";
 				let carregamento:any = document.getElementsByClassName("carregamento")[0]
 				carregamento.style.display = "none"

 				this.desempenhoDiario = new Chart(this.graficoDia.nativeElement, {

 					type: 'doughnut',

 					data: {
 						labels:datasets[0].label,
 						datasets: datasets
 					},
 					options: {

 						scales: {
 							yAxes: [{
 								ticks: {

 									display:false
 								}
 							}]
 						},
 						tooltips: {
 							callbacks: {
 								label: function(tooltipItem,data) {

 									let tempo = datasets[0].data[tooltipItem.index].toString().split(".")
 									let hora = tempo[0]
 									let minutos = (parseFloat("0." + tempo[1])*60).toFixed(0).toString();
 									if(parseInt(hora) < 10){
 										hora = "0" + hora;
 									}
 									if(parseInt(minutos) < 10){
 										minutos = "0" + minutos.toString()
 									}
 									return data.datasets[0].label[tooltipItem.index] + ": " + hora + ":" + minutos + ":00"


 								}
 							}
 						}
 					}

 				});
 			}

 		}

 	}
 	async graficoGeral(){
 		let data_atual = this.getDatasSemana()[new Date().getDay()]
 		let materias:any = await this.database.getListaMaterias();
 		let datasets = [{
 			data:[],
 			label:[],
 			backgroundColor:[],
 			borderColor:"black",
 			borderWidth: 1
 		}]
 		let hora:any = 0;
 		let minuto:any = 0;
 		for(let i = 0; i < materias.length;i++){

 			let estudo:any = await this.database.getEstudos(materias[i].nome)
 			for(let i = 0; i<estudo.length;i++){
 				let tempo = estudo[i].tempo.split(":")
 				hora  += parseInt(tempo[0])
 				minuto += parseFloat(tempo[1])/60
 			}
 			
 			
 			if(estudo.length > 0){
 				let aux = data_atual.split("-")
 				datasets[0].label.push(materias[i].nome)
 				datasets[0].backgroundColor.push(materias[i].cor)

 				datasets[0].data.push(hora + minuto);
 				hora = 0;
 				minuto = 0;
 			}



 		}
 		
 		if(datasets[0].data.length > 0){
 			this.desempenhoDiario = "liberado"
 			let canvas:any = document.getElementsByTagName("canvas")
 			if(canvas[2] != undefined){
 				canvas[2].style.width = "100%";
 				let carregamento:any = document.getElementsByClassName("carregamento")[2]
 				carregamento.style.display = "none"



 				this.desempenhoDiario = new Chart(this.graficoGera.nativeElement, {

 					type: 'doughnut',

 					data: {
 						labels:datasets[0].label,
 						datasets: datasets
 					},
 					options: {

 						scales: {
 							yAxes: [{
 								ticks: {

 									display:false
 								}
 							}]
 						},
 						tooltips: {
 							callbacks: {
 								label: function(tooltipItem,data) {

 									let tempo = datasets[0].data[tooltipItem.index].toString().split(".")
 									let hora = tempo[0]
 									let minutos = (parseFloat("0." + tempo[1])*60).toFixed(0).toString();
 									if(parseInt(hora) < 10){
 										hora = "0" + hora;
 									}
 									if(parseInt(minutos) < 10){
 										minutos = "0" + minutos.toString()
 									}
 									return data.datasets[0].label[tooltipItem.index] + ": " + hora + ":" + minutos + ":00"


 								}
 							}
 						}
 					}

 				});
 			}

 		}
 	}

 }
