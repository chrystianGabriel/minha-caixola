import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,ModalController,ViewController,PopoverController,LoadingController } from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase'
import {AdicionarMateriaPage} from '../adicionar-materia/adicionar-materia';
import {RelatorioMateriaPage} from '../relatorio-materia/relatorio-materia';
import {EditMateriasPage} from '../edit-materias/edit-materias';
import {IntroPage} from "../intro/intro";

/**
 * Generated class for the MinhasMateriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-minhas-materia',
 	templateUrl: 'minhas-materia.html',
 })
 export class MinhasMateriaPage {
 	private listMaterias;
 	constructor(public modalCtrl:ModalController,public loadCtrl:LoadingController,public popoverCtrl:PopoverController,public viewCtrl:ViewController,public toastCtrl:ToastController,public database:FirebaseProvider,public navCtrl: NavController, public navParams: NavParams) {
 	}
 	async ionViewDidEnter(){
     let load  = this.loadCtrl.create({content:"CARREGANDO DADOS,POR FAVOR,AGUARDE!"})
     load.present();
     this.listMaterias = await this.database.getListaMaterias()
     load.dismiss();




   }
   preencherCores(){
     let cores:any = document.getElementsByClassName("cores");
     let cards:any = document.getElementsByClassName("card");
     for(let i = 0; i < this.listMaterias.length;i++){
       cores[i].style.color = this.listMaterias[i].cor
     }
     for(let i = 0; i < this.listMaterias.length;i++){
       let hex1= this.listMaterias[i].cor[1] + this.listMaterias[i].cor[2]
       let hex2 = this.listMaterias[i].cor[3] + this.listMaterias[i].cor[4]
       let hex3 = this.listMaterias[i].cor[5] + this.listMaterias[i].cor[6]
       cards[i].style.background =  "rgba(" + parseInt(hex1,16) + "," + parseInt(hex2,16) + "," + parseInt(hex3,16) + "," + "0.2)";
     }
     
     


   }
   async deletarMateria(materia){
     let deletar = confirm("TEM CERTEZA QUE DESEJA DELETAR TODOS OS DADOS DESTA MATERIAS?")
     if(deletar){
       await this.database.deletarMateria(materia)
       this.listMaterias = await this.database.getListaMaterias()
     }
   }
   cadastrarMateria(){
     let ref = this;
     this.navCtrl.setRoot(AdicionarMateriaPage);

     this.viewCtrl.onDidDismiss(async ()=>{
       ref.listMaterias = await ref.database.getListaMaterias()
     })
   }

   relatorio(materia,cor){
     let popover = this.modalCtrl.create(RelatorioMateriaPage,{nome_materia:materia,cor_materia:cor});
     popover.present();
   }
   editarMateria(materia){
     let ref = this;
     let modal = this.modalCtrl.create(EditMateriasPage,{materia:materia});
     modal.present();
     modal.onDidDismiss(async ()=>{
       ref.listMaterias = await ref.database.getListaMaterias()
     })
   }
   abrirTutorial(){
     let modal = this.modalCtrl.create(IntroPage,{imgs:[{src:"t_minhas_materias_4.png"},
                                                        {src:"t_minhas_materias_3.png"},
                                                        {src:"t_minhas_materias_2.png"},
                                                        {src:"t_minhas_materias_1.png"},
                                                        {src:"t_minhas_materias_5.png"}]});
     modal.present();
   }
  

 }
