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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseProvider } from "../../providers/firebase/firebase";
/**
 * Generated class for the EnviarMensagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EnviarMensagemPage = /** @class */ (function () {
    function EnviarMensagemPage(modalCtrl, database, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.database = database;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    EnviarMensagemPage.prototype.enviarMensagem = function () {
        if (this.mensagem != "") {
            var not = confirm("Deseja enviar a notificação para todos os usuarios?");
            if (not) {
                this.database.enviarMensagem(this.mensagem);
            }
        }
        else {
            alert("É NECESSÁRIO DIGITAR UMA MENSAGEM");
        }
    };
    EnviarMensagemPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-enviar-mensagem',
            templateUrl: 'enviar-mensagem.html',
        }),
        __metadata("design:paramtypes", [ModalController, FirebaseProvider, NavController, NavParams])
    ], EnviarMensagemPage);
    return EnviarMensagemPage;
}());
export { EnviarMensagemPage };
//# sourceMappingURL=enviar-mensagem.js.map