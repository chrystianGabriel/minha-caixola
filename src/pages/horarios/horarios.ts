import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,PopoverController,ModalController,LoadingController,AlertController } from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase'
import {ListMateriasPage} from '../list-materias/list-materias';

 declare var require:any;
 let md5 = require("js-md5");
 @IonicPage()
 @Component({
   selector: 'page-horarios',
   templateUrl: 'horarios.html',
 })
 export class HorariosPage {

   private dia_semana;
   private array_materias;
   private hora;
   private minuto;
   private revisoes;
   constructor(public alertCtrl:AlertController,public loadCtrl:LoadingController,public modalCtrl:ModalController,public popoverCtrl:PopoverController,public toastCtrl:ToastController,public database:FirebaseProvider,public navCtrl: NavController, public navParams: NavParams) {
     let dia = new Date();
     this.dia_semana = dia.getDay()
     this.revisoes = new Array()

   }
   async ionViewDidEnter(){
     this.preencherHorario()
   }

   preencherCores(){
     let cores:any = document.getElementsByClassName("cores");
     let cards:any = document.getElementsByClassName("card");
     for(let i = 0; i < this.array_materias.length;i++){
       cores[i].style.color = this.array_materias[i].cor
     }
     for(let i = 0; i < this.array_materias.length;i++){
       let hex1= this.array_materias[i].cor[1] + this.array_materias[i].cor[2]
       let hex2 = this.array_materias[i].cor[3] + this.array_materias[i].cor[4]
       let hex3 = this.array_materias[i].cor[5] + this.array_materias[i].cor[6]
       cards[i].style.background =  "rgba(" + parseInt(hex1,16) + "," + parseInt(hex2,16) + "," + parseInt(hex3,16) + "," + "0.2)";
     }

   }
   async mudarDia(){
     this.preencherHorario()
     
   }
   async removerMateria(materia){
     let deletar = confirm("Deseja realmente remover essa materia?")
     if(deletar){
       await this.database.deletarMateriaDia(this.dia_semana,md5(materia))
       this.array_materias = await this.database.getMateriasDiaSemana(this.dia_semana)
       let tempo = 10;
       for(let  i = 0; i < this.array_materias.length;i++){
         let nivel = this.array_materias[i].nivel;
         console.log(nivel)
         if(nivel == 1){
           console.log(tempo*0.6)
           this.array_materias[i].meta = (tempo*0.6).toFixed(2);
         }else if(nivel == 2){
           this.array_materias[i].meta = (tempo*0.2).toFixed(2);
         }else if(nivel == 3){
           this.array_materias[i].meta = (tempo*0.1).toFixed(2);
         }

       }

     }
   }
   adicionarMateria(){

     this.navCtrl.setRoot(ListMateriasPage,{dia:this.dia_semana});
   }
   async preencherHorario(){
     this.revisoes = new Array();
     let dia_atual = this.getDatasSemana();
     this.array_materias = await this.database.getMateriasDiaSemana(this.dia_semana)
     let ref = this;
     let load = this.loadCtrl.create({content:"CARREGANDO INFORMAÇÕES, POR FAVOR, AGUARDE!"})
     load.present()
     if(this.navParams.get('dia') != undefined){
       this.dia_semana = this.navParams.get('dia');
     }

     if(this.array_materias){
       for(let  i = 0; i < this.array_materias.length;i++){
         let revisoes:any = await this.database.getRevisoes(this.array_materias[i].nome)
         
         for(let key in revisoes){
           console.log(dia_atual)
           if(revisoes[key].revisao24h == dia_atual[this.dia_semana]){
             this.revisoes.push({materia: this.array_materias[i].nome,tema:revisoes[key].tema,tempo:"00:30:00"})
           }else if(revisoes[key].revisao7d == dia_atual[this.dia_semana]){
             this.revisoes.push({materia: this.array_materias[i].nome,tema:revisoes[key].tema,tempo:"00:30:00"})
           }else if(revisoes[key].revisao30d == dia_atual[this.dia_semana]){
             this.revisoes.push({materia: this.array_materias[i].nome,tema:revisoes[key].tema,tempo:"00:30:00"})
           }
         }
       }
       let tempo:any = await this.database.getMetaSemanal();
       if(tempo){
         this.calcularMeta(tempo)
       }else{
         confirm("É nescessario cadastrar uma meta semanal!")
         if(!tempo){
           load.dismiss()
           let ref = this;
           tempo = "00:00:00";
           console.log(tempo)
           tempo = tempo.split(":")
           let horas = tempo[0]
           let minutos = tempo[1]
           let alertOp:any = {
             title:"META SEMANAL",
             message:"DIGITE A QUANTIDADE DE HORAS E MINUTOS QUE SESEJA ESTUDAR POR SEMANA!",
             inputs: [{
               name:'horas',
               placeholder:horas + " H",
               type:"number"
             },
             {
               name:'minutos',
               placeholder:minutos + " M",
               type:"number"
             }
             ],
             buttons: [
             {

               text: 'Salvar',
               handler: async data => {
                 console.log(data)
                 if(parseInt(data.horas) < 0){
                   let alertAux = this.alertCtrl.create({
                     title:"ATENÇÃO",
                     message:"AS HORAS DEVEM SER MAIOR QUE 0"
                   })
                   alertAux.present()

                   return;
                 }
                 if(parseInt(data.minutos) < 0){
                   let alertAux = this.alertCtrl.create({
                     title:"ATENÇÃO",
                     message:"OS MINUTOS INSERIDOS DEVEM SER MAIORES QUE 0"
                   })
                   alertAux.present()

                   return;
                 }
                 if(parseInt(data.minutos) > 59){
                   let alertAux = this.alertCtrl.create({
                     title:"ATENÇÃO",
                     message:"OS MINUTOS INSERIDOS DEVEM SER MENORES QUE 60"
                   })
                   alertAux.present()

                   return;
                 }
                 if(data.horas != ""){
                   data.minutos = (data.minutos == ""? "00":data.minutos)
                   await ref.database.cadastrarMetaSemanal(data.horas,data.minutos)
                 }


               }

             },
             {
               text: 'Cancelar',
               role: 'cancel' 
             }
             ],
             cssClass:"meta"
           }
           let alertAux = this.alertCtrl.create(alertOp)
           alertAux.present()
           alertAux.onDidDismiss(()=>{
             ref.calcularMeta(tempo);
           })
         }

       }
       load.dismiss();
     }else{
       load.dismiss()
     }
     



   }


   async calcularMeta(tempo){
   let totalQuestoes:any = 0;
    for(let  i = 0; i < this.array_materias.length;i++){
      totalQuestoes += Number(this.array_materias[i].questoes)*Number(this.array_materias[i].peso);
    }
    tempo = await this.database.getMetaSemanal()
    tempo = tempo.split(":")
    tempo = parseInt(tempo[0]) + parseInt(tempo[1])/60
    tempo = tempo/7
    tempo -= 0.5 * this.revisoes.length
    let peso_real_total:any = 0;

    for(let  i = 0; i < this.array_materias.length;i++){
      let peso_relativo:any = Number(this.array_materias[i].questoes)*Number(this.array_materias[i].peso)
      peso_real_total +=  ((peso_relativo/totalQuestoes)/this.array_materias[i].nivel)
    }
    for(let  i = 0; i < this.array_materias.length;i++){
      let peso_real =(Number(this.array_materias[i].questoes)*Number(this.array_materias[i].peso)/totalQuestoes)/this.array_materias[i].nivel
      let tempo_de_estudo:any = ((peso_real/peso_real_total)*tempo)
      let horas =parseInt(tempo_de_estudo)

      let minutos = (tempo_de_estudo - parseInt(tempo_de_estudo))*60

      this.array_materias[i].meta = ((horas < 10) ? "0" + horas:horas) + ":" + ((minutos < 10) ? "0" + minutos.toFixed(0):minutos.toFixed(0)) + ":00"
    }
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

 }
