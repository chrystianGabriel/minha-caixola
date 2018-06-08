import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController,ViewController,ToastController,LoadingController} from 'ionic-angular';
import {ColorPickerPage} from "../color-picker/color-picker"
import {FirebaseProvider} from "../../providers/firebase/firebase";

/**
 * Generated class for the EditMateriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-edit-materias',
 	templateUrl: 'edit-materias.html',
 })
 export class EditMateriasPage {

 	private materia;
   private nome;
   private nivel;
   private cor;
   private questoes;
   private peso;
   constructor(public popCtrl:PopoverController,public loadCtrl:LoadingController,public database:FirebaseProvider,public toastCtrl:ToastController,public navParams: NavParams,public viewCtrl:ViewController) {
     this.materia = this.navParams.get("materia");
     this.nome = this.materia.nome;
     this.nivel = this.materia.nivel;
     this.cor = this.materia.cor;
     this.questoes = this.materia.questoes;
     this.peso = this.materia.peso;

   }
   ionViewDidEnter(){
     document.getElementById("buttonColor").style.color = this.cor
     
   }

   async salvarAlteracoes(){
     let load = this.loadCtrl.create({
         content:"ISSO PODE LEVAR ALGUNS SEGUNDOS!"
     });
     load.present();
     let ref = this;
     this.database.editMateria({cor:this.cor,nivel:this.nivel,nome:this.nome,peso:this.peso,questoes:this.questoes},this.materia)
     .then(()=>{
       let toast = this.toastCtrl.create({
         message: "AS ALTERAÇÕES FORAM SALVAS COM SUCESSO",
         duration: 3000,
         position: 'top',
         cssClass:"toastSucesso"
       });
       toast.present();
       load.dismiss()
       ref.viewCtrl.dismiss();

     })
     .catch(()=>{
       let toast = this.toastCtrl.create({
         message: "HOUVE ALGUM ERRO AO TENTAR ALTERAR, POR FAVOR, TENTE NOVAMENTE!",
         duration: 3000,
         position: 'top',
         cssClass:"toastErro"
       });
       toast.present();
     })
   }
   cancelar(){
      this.viewCtrl.dismiss();
   }
   mostrarPopover(){
     let popover = this.popCtrl.create(ColorPickerPage);
     popover.present();
     popover.onDidDismiss(cor=>{
       this.cor = cor;
       document.getElementById("buttonColor").style.color = cor;
     })
   }




 }
