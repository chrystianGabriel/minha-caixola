import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,Injectable, Injector} from '@angular/core';
import { Pro } from '@ionic/pro';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import { BoasVindasPage } from '../pages/boas-vindas/boas-vindas';
import { AdicionarMateriaPage } from '../pages/adicionar-materia/adicionar-materia';
import {ColorPickerPage} from "../pages/color-picker/color-picker"
import { FirebaseProvider } from '../providers/firebase/firebase';
import {HorariosPage} from '../pages/horarios/horarios';
import {GravarEstudosPage} from '../pages/gravar-estudos/gravar-estudos'
import {ListMateriasPage} from '../pages/list-materias/list-materias';
import {MinhasMateriaPage} from '../pages/minhas-materia/minhas-materia';
import {EditMateriasPage} from '../pages/edit-materias/edit-materias';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Keyboard } from '@ionic-native/keyboard';
import {RelatorioMateriaPage} from '../pages/relatorio-materia/relatorio-materia';
import {DesempenhoPage} from "../pages/desempenho/desempenho";
import {PerfilAdminPage} from "../pages/perfil-admin/perfil-admin";
import {CadastrarPage} from "../pages/cadastrar/cadastrar";
import {EnviarMensagemPage} from "../pages/enviar-mensagem/enviar-mensagem";
import { OneSignal } from '@ionic-native/onesignal';
import { Http,HttpModule} from '@angular/http';
import { TooltipsModule } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {IntroPage} from "../pages/intro/intro";
import {MateriaDescricaoPage} from "../pages/materia-descricao/materia-descricao";
import { CodePush } from '@ionic-native/code-push';
Pro.init('45f3d442', {
  appVersion: '1.0.0'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    BoasVindasPage,
    AdicionarMateriaPage,
    ColorPickerPage,
    HorariosPage,
    GravarEstudosPage,
    ListMateriasPage,
    MinhasMateriaPage,
    EditMateriasPage,
    RelatorioMateriaPage,
    DesempenhoPage,
    PerfilAdminPage,
    CadastrarPage,
    EnviarMensagemPage,
    IntroPage,
    MateriaDescricaoPage
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{scrollAssist: true, autoFocusAssist: true}),
    TooltipsModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    BoasVindasPage,
    AdicionarMateriaPage,
    ColorPickerPage,
    HorariosPage,
    GravarEstudosPage,
    ListMateriasPage,
    MinhasMateriaPage,
    EditMateriasPage,
    RelatorioMateriaPage,
    DesempenhoPage,
    PerfilAdminPage,
    CadastrarPage,
    EnviarMensagemPage,
    IntroPage,
    MateriaDescricaoPage
  

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    LocalNotifications,
    Keyboard,
     OneSignal,
     CodePush
  ]
})
export class AppModule {}
