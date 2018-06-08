var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { Pro } from '@ionic/pro';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BoasVindasPage } from '../pages/boas-vindas/boas-vindas';
import { AdicionarMateriaPage } from '../pages/adicionar-materia/adicionar-materia';
import { ColorPickerPage } from "../pages/color-picker/color-picker";
import { FirebaseProvider } from '../providers/firebase/firebase';
import { HorariosPage } from '../pages/horarios/horarios';
import { GravarEstudosPage } from '../pages/gravar-estudos/gravar-estudos';
import { ListMateriasPage } from '../pages/list-materias/list-materias';
import { MinhasMateriaPage } from '../pages/minhas-materia/minhas-materia';
import { EditMateriasPage } from '../pages/edit-materias/edit-materias';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Keyboard } from '@ionic-native/keyboard';
import { RelatorioMateriaPage } from '../pages/relatorio-materia/relatorio-materia';
import { DesempenhoPage } from "../pages/desempenho/desempenho";
import { PerfilAdminPage } from "../pages/perfil-admin/perfil-admin";
import { CadastrarPage } from "../pages/cadastrar/cadastrar";
import { EnviarMensagemPage } from "../pages/enviar-mensagem/enviar-mensagem";
import { OneSignal } from '@ionic-native/onesignal';
import { HttpModule } from '@angular/http';
import { TooltipsModule } from 'ionic-tooltips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroPage } from "../pages/intro/intro";
Pro.init('45f3d442', {
    appVersion: '0.0.1'
});
var MyErrorHandler = /** @class */ (function () {
    function MyErrorHandler(injector) {
        try {
            this.ionicErrorHandler = injector.get(IonicErrorHandler);
        }
        catch (e) {
            // Unable to get the IonicErrorHandler provider, ensure
            // IonicErrorHandler has been added to the providers list below
        }
    }
    MyErrorHandler.prototype.handleError = function (err) {
        Pro.monitoring.handleNewError(err);
        // Remove this if you want to disable Ionic's auto exception handling
        // in development mode.
        this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    };
    MyErrorHandler = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Injector])
    ], MyErrorHandler);
    return MyErrorHandler;
}());
export { MyErrorHandler };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                IntroPage
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                HttpModule,
                IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
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
                IntroPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                FirebaseProvider,
                LocalNotifications,
                Keyboard,
                OneSignal
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map