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
import { IonicPage, NavController, NavParams, ToastController, ModalController, ViewController, PopoverController, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AdicionarMateriaPage } from '../adicionar-materia/adicionar-materia';
import { RelatorioMateriaPage } from '../relatorio-materia/relatorio-materia';
import { EditMateriasPage } from '../edit-materias/edit-materias';
/**
 * Generated class for the MinhasMateriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MinhasMateriaPage = /** @class */ (function () {
    function MinhasMateriaPage(modalCtrl, loadCtrl, popoverCtrl, viewCtrl, toastCtrl, database, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.loadCtrl = loadCtrl;
        this.popoverCtrl = popoverCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.database = database;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MinhasMateriaPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var load, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        load = this.loadCtrl.create({ content: "CARREGANDO DADOS,POR FAVOR,AGUARDE!" });
                        load.present();
                        _a = this;
                        return [4 /*yield*/, this.database.getListaMaterias()];
                    case 1:
                        _a.listMaterias = _b.sent();
                        load.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    MinhasMateriaPage.prototype.preencherCores = function () {
        var cores = document.getElementsByClassName("cores");
        var cards = document.getElementsByClassName("card");
        for (var i = 0; i < this.listMaterias.length; i++) {
            cores[i].style.color = this.listMaterias[i].cor;
        }
        for (var i = 0; i < this.listMaterias.length; i++) {
            var hex1 = this.listMaterias[i].cor[1] + this.listMaterias[i].cor[2];
            var hex2 = this.listMaterias[i].cor[3] + this.listMaterias[i].cor[4];
            var hex3 = this.listMaterias[i].cor[5] + this.listMaterias[i].cor[6];
            cards[i].style.background = "rgba(" + parseInt(hex1, 16) + "," + parseInt(hex2, 16) + "," + parseInt(hex3, 16) + "," + "0.2)";
        }
    };
    MinhasMateriaPage.prototype.deletarMateria = function (materia) {
        return __awaiter(this, void 0, void 0, function () {
            var deletar, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        deletar = confirm("TEM CERTEZA QUE DESEJA DELETAR TODOS OS DADOS DESTA MATERIAS?");
                        if (!deletar) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.database.deletarMateria(materia)];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.database.getListaMaterias()];
                    case 2:
                        _a.listMaterias = _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MinhasMateriaPage.prototype.cadastrarMateria = function () {
        var _this = this;
        var ref = this;
        this.navCtrl.setRoot(AdicionarMateriaPage);
        this.viewCtrl.onDidDismiss(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ref;
                        return [4 /*yield*/, ref.database.getListaMaterias()];
                    case 1:
                        _a.listMaterias = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    MinhasMateriaPage.prototype.relatorio = function (materia) {
        var popover = this.modalCtrl.create(RelatorioMateriaPage, { materia: materia });
        popover.present();
    };
    MinhasMateriaPage.prototype.editarMateria = function (materia) {
        var _this = this;
        var ref = this;
        var modal = this.modalCtrl.create(EditMateriasPage, { materia: materia });
        modal.present();
        modal.onDidDismiss(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ref;
                        return [4 /*yield*/, ref.database.getListaMaterias()];
                    case 1:
                        _a.listMaterias = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    MinhasMateriaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-minhas-materia',
            templateUrl: 'minhas-materia.html',
        }),
        __metadata("design:paramtypes", [ModalController, LoadingController, PopoverController, ViewController, ToastController, FirebaseProvider, NavController, NavParams])
    ], MinhasMateriaPage);
    return MinhasMateriaPage;
}());
export { MinhasMateriaPage };
//# sourceMappingURL=minhas-materia.js.map