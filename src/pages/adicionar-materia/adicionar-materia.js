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
import { IonicPage, NavController, NavParams, PopoverController, ViewController, ToastController } from 'ionic-angular';
import { ColorPickerPage } from "../color-picker/color-picker";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { MinhasMateriaPage } from "../minhas-materia/minhas-materia";
/**
 * Generated class for the AdicionarMateriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdicionarMateriaPage = /** @class */ (function () {
    function AdicionarMateriaPage(toast, viewCtrl, database, popCtrl, navCtrl, navParams) {
        this.toast = toast;
        this.viewCtrl = viewCtrl;
        this.database = database;
        this.popCtrl = popCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nome = "";
        this.nivel = 1;
        this.cor = '#990000';
        this.questoes = 0;
        this.peso = 0;
        this.seg = false;
        this.ter = false;
        this.qua = false;
        this.quin = false;
        this.sex = false;
        this.sab = false;
        this.dom = false;
    }
    AdicionarMateriaPage.prototype.ionViewDidLoad = function () {
        document.getElementById("buttonColor").style.color = this.cor;
        var ref = this;
    };
    AdicionarMateriaPage.prototype.mostrarPopover = function () {
        var _this = this;
        var popover = this.popCtrl.create(ColorPickerPage);
        popover.present();
        popover.onDidDismiss(function (cor) {
            _this.cor = cor;
            document.getElementById("buttonColor").style.color = cor;
        });
    };
    AdicionarMateriaPage.prototype.cadastrarMateria = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var toast, toast, ref_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.nome == "" || this.questoes == "" || this.peso == "" || (!this.seg && !this.ter && !this.qua && !this.quin && !this.sex && !this.sab && !this.dom))) return [3 /*break*/, 1];
                        toast = this.toast.create({
                            message: 'VOCÊ DEVE PREENCHER TODOS OS CAMPOS!',
                            duration: 3000,
                            position: 'top',
                            cssClass: "toastErro"
                        });
                        toast.present();
                        return [3 /*break*/, 18];
                    case 1:
                        if (!(this.questoes < 0 || this.peso < 0 || this.peso > 3)) return [3 /*break*/, 2];
                        toast = this.toast.create({
                            message: 'O NÚMERO DE QUESTÕES E O PESO NÃO DEVEM SER MENOR QUE ZERO.O PESO DA MATERIA NÃO DEVE SER MAIOR QUE 3',
                            duration: 6000,
                            position: 'top',
                            cssClass: "toastErro"
                        });
                        toast.present();
                        return [3 /*break*/, 18];
                    case 2:
                        if (!this.seg) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.database.cadastrarHorarios(1, this.nome)
                                .then(function () { })
                                .catch(function (e) {
                                console.log(e);
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!this.ter) return [3 /*break*/, 6];
                        console.log(this.ter);
                        return [4 /*yield*/, this.database.cadastrarHorarios(2, this.nome)
                                .then(function () { })
                                .catch(function (e) {
                                console.log(e);
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!this.qua) return [3 /*break*/, 8];
                        console.log(this.qua);
                        return [4 /*yield*/, this.database.cadastrarHorarios(3, this.nome)
                                .then(function () { })
                                .catch(function (e) {
                                console.log(e);
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!this.quin) return [3 /*break*/, 10];
                        console.log(this.quin);
                        return [4 /*yield*/, this.database.cadastrarHorarios(4, this.nome)
                                .then(function () { })
                                .catch(function (e) {
                                console.log(e);
                            })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!this.sex) return [3 /*break*/, 12];
                        console.log(this.sex);
                        return [4 /*yield*/, this.database.cadastrarHorarios(5, this.nome)
                                .then(function () { })
                                .catch(function (e) {
                                console.log(e);
                            })];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        if (!this.sab) return [3 /*break*/, 14];
                        console.log(this.sab);
                        return [4 /*yield*/, this.database.cadastrarHorarios(6, this.nome)
                                .then(function () { })
                                .catch(function (e) {
                                console.log(e);
                            })];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        if (!this.dom) return [3 /*break*/, 16];
                        console.log(this.dom);
                        return [4 /*yield*/, this.database.cadastrarHorarios(0, this.nome)
                                .then(function () { })
                                .catch(function (e) {
                                console.log(e);
                            })];
                    case 15:
                        _a.sent();
                        _a.label = 16;
                    case 16:
                        ref_1 = this;
                        return [4 /*yield*/, this.database.cadastrarMateria({ nome: this.nome,
                                nivel: this.nivel,
                                cor: this.cor, questoes: this.questoes, peso: this.peso })
                                .then(function () {
                                var toast = _this.toast.create({
                                    message: 'MATERIA CRIADA COM SUCESSO!',
                                    duration: 3000,
                                    position: 'top',
                                    cssClass: "toastSucesso"
                                });
                                toast.present();
                                ref_1.navCtrl.setRoot(MinhasMateriaPage);
                            })
                                .catch(function (erro) {
                                var toast = _this.toast.create({
                                    message: erro,
                                    duration: 3000,
                                    position: 'top',
                                    cssClass: "toastErro"
                                });
                                toast.present();
                            })];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    AdicionarMateriaPage.prototype.cancelar = function () {
        this.viewCtrl.dismiss();
    };
    AdicionarMateriaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-adicionar-materia',
            templateUrl: 'adicionar-materia.html',
        }),
        __metadata("design:paramtypes", [ToastController, ViewController, FirebaseProvider, PopoverController, NavController, NavParams])
    ], AdicionarMateriaPage);
    return AdicionarMateriaPage;
}());
export { AdicionarMateriaPage };
//# sourceMappingURL=adicionar-materia.js.map