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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnviarMensagemPage } from "../enviar-mensagem/enviar-mensagem";
import { CadastrarPage } from "../cadastrar/cadastrar";
/**
 * Generated class for the PerfilAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerfilAdminPage = /** @class */ (function () {
    function PerfilAdminPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cadastrarPage = CadastrarPage;
        this.enviarMensagemPage = EnviarMensagemPage;
    }
    PerfilAdminPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-perfil-admin',
            templateUrl: 'perfil-admin.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], PerfilAdminPage);
    return PerfilAdminPage;
}());
export { PerfilAdminPage };
//# sourceMappingURL=perfil-admin.js.map