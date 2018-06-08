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
import { ToastController, ModalController, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { GravarEstudosPage } from '../../pages/gravar-estudos/gravar-estudos';
var HomePage = /** @class */ (function () {
    function HomePage(loadCtrl, database, toastCtrl, modalCtrl) {
        this.loadCtrl = loadCtrl;
        this.database = database;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        var aux = new Date();
        this.dataAtual = "";
        if (aux.getDate() < 10) {
            this.dataAtual = "0" + aux.getDate();
        }
        else {
            this.dataAtual += aux.getDate();
        }
        if (aux.getMonth() < 9) {
            var num = aux.getMonth() + 1;
            this.dataAtual += "/0" + num;
        }
        else {
            var num = aux.getMonth() + 1;
            this.dataAtual += "/" + num;
        }
        this.dataAtual += "/" + aux.getFullYear();
        this.materia_mais_estudada = { tempoLabel: "--:--", tempo: Number.MIN_VALUE, nome: "-" };
        this.materia_menos_estudada = { tempoLabel: "--:--", tempo: Number.MAX_VALUE, nome: "-" };
        this.materia_menos_acertos = { porcentagemLabel: "--", porcentagem: Number.MAX_VALUE, nome: "--" };
        this.materia_mais_acertos = { porcentagemLabel: "--", porcentagem: Number.MIN_VALUE, nome: "--" };
    }
    HomePage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ref, load, data, _a, dia_atual, porcentagem, i, estudos, tempo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ref = this;
                        load = ref.loadCtrl.create({ content: "CARREGANDO INFORMAÇÕES, POR FAVOR, AGUARDE!" });
                        load.present();
                        data = new Date();
                        _a = ref;
                        return [4 /*yield*/, ref.database.getListaMaterias()];
                    case 1:
                        _a.listMaterias = _b.sent();
                        console.log(ref.listMaterias);
                        dia_atual = new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" + (new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate());
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < ref.listMaterias.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, ref.database.getEstudosData(ref.listMaterias[i].nome, dia_atual)];
                    case 3:
                        estudos = _b.sent();
                        console.log(estudos);
                        if (estudos) {
                            tempo = estudos.tempo.split(":");
                            tempo = parseInt(tempo[0]) + parseInt(tempo[1]) / 60;
                            if (estudos.exercicios != "" && estudos.acertos != "") {
                                porcentagem = ((parseInt(estudos.acertos) * 100) / parseInt(estudos.exercicios)).toFixed(0);
                            }
                            if (tempo > ref.materia_mais_estudada.tempo) {
                                ref.materia_mais_estudada.tempoLabel = estudos.tempo;
                                ref.materia_mais_estudada.tempo = tempo;
                                ref.materia_mais_estudada.nome = ref.listMaterias[i].nome;
                            }
                            if (tempo < ref.materia_menos_estudada.tempo) {
                                ref.materia_menos_estudada.tempoLabel = estudos.tempo;
                                ref.materia_menos_estudada.tempo = tempo;
                                ref.materia_menos_estudada.nome = ref.listMaterias[i].nome;
                            }
                            if (porcentagem > ref.materia_mais_acertos.porcentagem) {
                                ref.materia_mais_acertos.porcentagemLabel = porcentagem + "%";
                                ref.materia_mais_acertos.porcentagem = porcentagem;
                                ref.materia_mais_acertos.nome = ref.listMaterias[i].nome;
                            }
                            if (porcentagem < ref.materia_menos_acertos.porcentagem) {
                                ref.materia_menos_acertos.porcentagemLabel = porcentagem + "%";
                                ref.materia_menos_acertos.porcentagem = porcentagem;
                                ref.materia_menos_acertos.nome = ref.listMaterias[i].nome;
                            }
                        }
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        load.dismiss();
                        this.tutorial = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.preencherCores = function () {
        var cores = document.getElementsByClassName("cores");
        for (var i = 0; i < this.listMaterias.length; i++) {
            cores[i].style.color = this.listMaterias[i].cor;
        }
    };
    HomePage.prototype.iniciarEstudos = function () {
        var modal = this.modalCtrl.create(GravarEstudosPage);
        modal.present();
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [LoadingController, FirebaseProvider, ToastController, ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map