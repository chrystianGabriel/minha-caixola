var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { BoasVindasPage } from '../boas-vindas/boas-vindas';
import { PerfilAdminPage } from "../perfil-admin/perfil-admin";
var LoginPage = /** @class */ (function () {
    function LoginPage(database, loadCtrl, toast, navCtrl, navParams) {
        this.database = database;
        this.loadCtrl = loadCtrl;
        this.toast = toast;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.email = "";
        this.senha = "";
    }
    LoginPage.prototype.ionViewDidLoad = function () {
    };
    LoginPage.prototype.login = function () {
        var ref = this;
        var load = this.loadCtrl.create({ content: "EFETUANDO LOGIN" });
        load.present();
        if (this.email != "" && this.senha != "") {
            this.database.login(this.email, this.senha)
                .then(function () {
                var toast = ref.toast.create({
                    message: 'LOGIN EFETUADO COM SUCESSO!',
                    duration: 3000,
                    position: 'top',
                    cssClass: "toastSucesso"
                });
                load.dismiss();
                toast.present();
                var uid = ref.database.getUsuario();
                if (uid == "0PbBHDIWiQTUXMW1MkHduD9fPxp1") {
                    ref.navCtrl.push(PerfilAdminPage);
                }
                else {
                    ref.navCtrl.push(BoasVindasPage);
                }
            })
                .catch(function (erro) {
                var toast = ref.toast.create({
                    message: erro,
                    duration: 3000,
                    position: 'top',
                    cssClass: "toastErro"
                });
                load.dismiss();
                toast.present();
            });
        }
        else {
            var toast = this.toast.create({
                message: 'TODOS OS CAMPOS SÃO OBRIGATORIOS!',
                duration: 3000,
                position: 'top',
                cssClass: "toastErro"
            });
            toast.present();
            load.dismiss();
        }
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [FirebaseProvider, LoadingController, ToastController, NavController, NavParams])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map