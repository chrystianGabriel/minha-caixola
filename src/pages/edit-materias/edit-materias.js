var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { IonicPage, NavParams, PopoverController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { ColorPickerPage } from "../color-picker/color-picker";
import { FirebaseProvider } from "../../providers/firebase/firebase";
/**
 * Generated class for the EditMateriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditMateriasPage = /** @class */ (function () {
    function EditMateriasPage(popCtrl, loadCtrl, database, toastCtrl, navParams, viewCtrl) {
        this.popCtrl = popCtrl;
        this.loadCtrl = loadCtrl;
        this.database = database;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.materia = this.navParams.get("materia");
        this.nome = this.materia.nome;
        this.nivel = this.materia.nivel;
        this.cor = this.materia.cor;
        this.questoes = this.materia.questoes;
        this.peso = this.materia.peso;
    }
    EditMateriasPage.prototype.ionViewDidEnter = function () {
        document.getElementById("buttonColor").style.color = this.cor;
    };
    EditMateriasPage.prototype.salvarAlteracoes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var load, ref;
            return __generator(this, function (_a) {
                load = this.loadCtrl.create({
                    content: "ISSO PODE LEVAR ALGUNS SEGUNDOS!"
                });
                load.present();
                ref = this;
                this.database.editMateria({ cor: this.cor, nivel: this.nivel, nome: this.nome, peso: this.peso, questoes: this.questoes }, this.materia)
                    .then(function () {
                    var toast = _this.toastCtrl.create({
                        message: "AS ALTERAÇÕES FORAM SALVAS COM SUCESSO",
                        duration: 3000,
                        position: 'top',
                        cssClass: "toastSucesso"
                    });
                    toast.present();
                    load.dismiss();
                    ref.viewCtrl.dismiss();
                })
                    .catch(function () {
                    var toast = _this.toastCtrl.create({
                        message: "HOUVE ALGUM ERRO AO TENTAR ALTERAR, POR FAVOR, TENTE NOVAMENTE!",
                        duration: 3000,
                        position: 'top',
                        cssClass: "toastErro"
                    });
                    toast.present();
                });
                return [2 /*return*/];
            });
        });
    };
    EditMateriasPage.prototype.cancelar = function () {
        this.viewCtrl.dismiss();
    };
    EditMateriasPage.prototype.mostrarPopover = function () {
        var _this = this;
        var popover = this.popCtrl.create(ColorPickerPage);
        popover.present();
        popover.onDidDismiss(function (cor) {
            _this.cor = cor;
            document.getElementById("buttonColor").style.color = cor;
        });
    };
    EditMateriasPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-edit-materias',
            templateUrl: 'edit-materias.html',
        }),
        __metadata("design:paramtypes", [PopoverController, LoadingController, FirebaseProvider, ToastController, NavParams, ViewController])
    ], EditMateriasPage);
    return EditMateriasPage;
}());
export { EditMateriasPage };
//# sourceMappingURL=edit-materias.js.map