import { Component } from '@angular/core';
import { Platform,NavController,AlertController,ModalController} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login'
import { HomePage } from '../pages/home/home';
import { BoasVindasPage } from '../pages/boas-vindas/boas-vindas';
import { AdicionarMateriaPage } from '../pages/adicionar-materia/adicionar-materia';
import {HorariosPage} from '../pages/horarios/horarios';
import {GravarEstudosPage} from '../pages/gravar-estudos/gravar-estudos';
import {ListMateriasPage} from '../pages/list-materias/list-materias';
import {MinhasMateriaPage} from '../pages/minhas-materia/minhas-materia';
import {EditMateriasPage} from '../pages/edit-materias/edit-materias';
import {RelatorioMateriaPage} from '../pages/relatorio-materia/relatorio-materia';
import {DesempenhoPage} from "../pages/desempenho/desempenho";
import {FirebaseProvider} from "../providers/firebase/firebase";
import {PerfilAdminPage} from "../pages/perfil-admin/perfil-admin";
import {IntroPage} from "../pages/intro/intro";
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push';
import { MenuController } from 'ionic-angular';
declare var cronometro:any;
declare var window:any;
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = LoginPage;
  inicio = HomePage
  minhasMateria = MinhasMateriaPage
  horarios = HorariosPage
  gravar_estudo = GravarEstudosPage
  desempenho = DesempenhoPage

  constructor(public menu:MenuController,private codePush: CodePush,private modalCtrl:ModalController,private database:FirebaseProvider,private alertCtrl:AlertController,keyboard: Keyboard,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.menu.swipeEnable(false,"menu")
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      keyboard.disableScroll(true);
      statusBar.styleDefault();
      splashScreen.hide();
      //this.database.receberMensagem();
      this.executarCodePush();
      


    });
  }
  abrirPagina(pagina){
    if(cronometro == undefined){
      this.rootPage = pagina
    }else{

      let alertAux = this.alertCtrl.create({
        title:"ATENÇÃO",
        message:"PARA FECHAR ESTÁ PAGINA VOCÊ DEVE CANCELAR OU GRAVAR O TEMPO DE ESTUDO!"
      })
      alertAux.present()
    }
  }
  executarCodePush() {
    
     this.codePush.sync({
      updateDialog: {
       appendReleaseDescription: true,
       descriptionPrefix: "\n\nChange log:\n"   
      },
      installMode: InstallMode.IMMEDIATE
   }).subscribe(
     (data) => {
      console.log('CODE PUSH SUCCESSFUL: ' + data);
      
     },
     (err) => {
      console.log('CODE PUSH ERROR: ' + err);
      
     }
   );
  }

  async cadastrarMeta(){
    let ref = this;
    let tempo:any = await this.database.getMetaSemanal();
    if(!tempo) tempo = "00:00:00"
      tempo = tempo.split(":")
    let horas = tempo[0]
    let minutos = tempo[1]
    let a:any = {
      title:"ATENÇÃO",
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
    let alertAux = this.alertCtrl.create(a)
    alertAux.present()
  }

}

