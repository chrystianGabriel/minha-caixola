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
import { IonicPage, NavController, NavParams, ToastController, PopoverController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ListMateriasPage } from '../list-materias/list-materias';
var md5 = require("js-md5");
var HorariosPage = /** @class */ (function () {
    function HorariosPage(alertCtrl, loadCtrl, modalCtrl, popoverCtrl, toastCtrl, database, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.loadCtrl = loadCtrl;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.toastCtrl = toastCtrl;
        this.database = database;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        var dia = new Date();
        this.dia_semana = dia.getDay();
        this.revisoes = new Array();
    }
    HorariosPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.preencherHorario();
                return [2 /*return*/];
            });
        });
    };
    HorariosPage.prototype.preencherCores = function () {
        var cores = document.getElementsByClassName("cores");
        var cards = document.getElementsByClassName("card");
        for (var i = 0; i < this.array_materias.length; i++) {
            cores[i].style.color = this.array_materias[i].cor;
        }
        for (var i = 0; i < this.array_materias.length; i++) {
            var hex1 = this.array_materias[i].cor[1] + this.array_materias[i].cor[2];
            var hex2 = this.array_materias[i].cor[3] + this.array_materias[i].cor[4];
            var hex3 = this.array_materias[i].cor[5] + this.array_materias[i].cor[6];
            cards[i].style.background = "rgba(" + parseInt(hex1, 16) + "," + parseInt(hex2, 16) + "," + parseInt(hex3, 16) + "," + "0.2)";
        }
    };
    HorariosPage.prototype.mudarDia = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.preencherHorario();
                return [2 /*return*/];
            });
        });
    };
    HorariosPage.prototype.removerMateria = function (materia) {
        return __awaiter(this, void 0, void 0, function () {
            var deletar, _a, tempo, i, nivel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        deletar = confirm("Deseja realmente remover essa materia?");
                        if (!deletar) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.database.deletarMateriaDia(this.dia_semana, md5(materia))];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.database.getMateriasDiaSemana(this.dia_semana)];
                    case 2:
                        _a.array_materias = _b.sent();
                        tempo = 10;
                        for (i = 0; i < this.array_materias.length; i++) {
                            nivel = this.array_materias[i].nivel;
                            console.log(nivel);
                            if (nivel == 1) {
                                console.log(tempo * 0.6);
                                this.array_materias[i].meta = (tempo * 0.6).toFixed(2);
                            }
                            else if (nivel == 2) {
                                this.array_materias[i].meta = (tempo * 0.2).toFixed(2);
                            }
                            else if (nivel == 3) {
                                this.array_materias[i].meta = (tempo * 0.1).toFixed(2);
                            }
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HorariosPage.prototype.adicionarMateria = function () {
        this.navCtrl.setRoot(ListMateriasPage, { dia: this.dia_semana });
    };
    HorariosPage.prototype.preencherHorario = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ref, load, dia_atual, _a, i, revisoes, tempo_1, ref_1, horas, minutos, alertOp, alertAux;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ref = this;
                        load = this.loadCtrl.create({ content: "CARREGANDO INFORMAÇÕES, POR FAVOR, AGUARDE!" });
                        load.present();
                        dia_atual = new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "-" + (new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate());
                        if (this.navParams.get('dia') != undefined) {
                            this.dia_semana = this.navParams.get('dia');
                        }
                        _a = this;
                        return [4 /*yield*/, this.database.getMateriasDiaSemana(this.dia_semana)];
                    case 1:
                        _a.array_materias = _b.sent();
                        if (!this.array_materias) return [3 /*break*/, 7];
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < this.array_materias.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.database.getRevisoes(this.array_materias[i].nome)];
                    case 3:
                        revisoes = _b.sent();
                        console.log(revisoes);
                        if (revisoes) {
                            if (revisoes.revisao24h == dia_atual) {
                                this.revisoes.push({ materia: this.array_materias[i].nome, tema: revisoes.tema, tempo: "00:30:00" });
                            }
                            else if (revisoes.revisao7d == dia_atual) {
                                this.revisoes.push({ materia: this.array_materias[i].nome, tema: revisoes.tema, tempo: "00:30:00" });
                            }
                            else if (revisoes.revisao30d == dia_atual) {
                                this.revisoes.push({ materia: this.array_materias[i].nome, tema: revisoes.tema, tempo: "00:30:00" });
                            }
                        }
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.database.getMetaSemanal()];
                    case 6:
                        tempo_1 = _b.sent();
                        if (!tempo_1) {
                            load.dismiss();
                            ref_1 = this;
                            tempo_1 = "00:00:00";
                            console.log(tempo_1);
                            tempo_1 = tempo_1.split(":");
                            horas = tempo_1[0];
                            minutos = tempo_1[1];
                            alertOp = {
                                title: "META SEMANAL",
                                message: "DIGITE A QUANTIDADE DE HORAS E MINUTOS QUE SESEJA ESTUDAR POR SEMANA!",
                                inputs: [{
                                        name: 'horas',
                                        placeholder: horas + " H",
                                        type: "number"
                                    },
                                    {
                                        name: 'minutos',
                                        placeholder: minutos + " M",
                                        type: "number"
                                    }
                                ],
                                buttons: [
                                    {
                                        text: 'Salvar',
                                        handler: function (data) { return __awaiter(_this, void 0, void 0, function () {
                                            var alertAux_1, alertAux_2, alertAux_3;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        console.log(data);
                                                        if (parseInt(data.horas) < 0) {
                                                            alertAux_1 = this.alertCtrl.create({
                                                                title: "ATENÇÃO",
                                                                message: "AS HORAS DEVEM SER MAIOR QUE 0"
                                                            });
                                                            alertAux_1.present();
                                                            return [2 /*return*/];
                                                        }
                                                        if (parseInt(data.minutos) < 0) {
                                                            alertAux_2 = this.alertCtrl.create({
                                                                title: "ATENÇÃO",
                                                                message: "OS MINUTOS INSERIDOS DEVEM SER MAIORES QUE 0"
                                                            });
                                                            alertAux_2.present();
                                                            return [2 /*return*/];
                                                        }
                                                        if (parseInt(data.minutos) > 59) {
                                                            alertAux_3 = this.alertCtrl.create({
                                                                title: "ATENÇÃO",
                                                                message: "OS MINUTOS INSERIDOS DEVEM SER MENORES QUE 60"
                                                            });
                                                            alertAux_3.present();
                                                            return [2 /*return*/];
                                                        }
                                                        if (!(data.horas != "")) return [3 /*break*/, 2];
                                                        data.minutos = (data.minutos == "" ? "00" : data.minutos);
                                                        return [4 /*yield*/, ref_1.database.cadastrarMetaSemanal(data.horas, data.minutos)];
                                                    case 1:
                                                        _a.sent();
                                                        _a.label = 2;
                                                    case 2: return [2 /*return*/];
                                                }
                                            });
                                        }); }
                                    },
                                    {
                                        text: 'Cancelar',
                                        role: 'cancel'
                                    }
                                ],
                                cssClass: "meta"
                            };
                            alertAux = this.alertCtrl.create(alertOp);
                            alertAux.present();
                            alertAux.onDidDismiss(function () {
                                ref_1.calcularMeta(tempo_1);
                            });
                        }
                        else {
                            ref.calcularMeta(tempo_1);
                            load.dismiss();
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        load.dismiss();
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    HorariosPage.prototype.calcularMeta = function (tempo) {
        return __awaiter(this, void 0, void 0, function () {
            var totalQuestoes, i, peso_real_total, i, peso_relativo, i, peso_real, tempo_de_estudo, horas, minutos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalQuestoes = 0;
                        for (i = 0; i < this.array_materias.length; i++) {
                            totalQuestoes += Number(this.array_materias[i].questoes) * Number(this.array_materias[i].peso);
                        }
                        return [4 /*yield*/, this.database.getMetaSemanal()];
                    case 1:
                        tempo = _a.sent();
                        tempo = tempo.split(":");
                        tempo = parseInt(tempo[0]) + parseInt(tempo[1]) / 60;
                        tempo = tempo / 7;
                        tempo -= 0.5 * this.revisoes.length;
                        peso_real_total = 0;
                        for (i = 0; i < this.array_materias.length; i++) {
                            peso_relativo = Number(this.array_materias[i].questoes) * Number(this.array_materias[i].peso);
                            peso_real_total += ((peso_relativo / totalQuestoes) / this.array_materias[i].nivel);
                        }
                        for (i = 0; i < this.array_materias.length; i++) {
                            peso_real = (Number(this.array_materias[i].questoes) * Number(this.array_materias[i].peso) / totalQuestoes) / this.array_materias[i].nivel;
                            tempo_de_estudo = ((peso_real / peso_real_total) * tempo);
                            horas = parseInt(tempo_de_estudo);
                            minutos = (tempo_de_estudo - parseInt(tempo_de_estudo)) * 60;
                            this.array_materias[i].meta = ((horas < 10) ? "0" + horas : horas) + ":" + ((minutos < 10) ? "0" + minutos.toFixed(0) : minutos.toFixed(0)) + ":00";
                        }
                        console.log("sd");
                        return [2 /*return*/];
                }
            });
        });
    };
    HorariosPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-horarios',
            templateUrl: 'horarios.html',
        }),
        __metadata("design:paramtypes", [AlertController, LoadingController, ModalController, PopoverController, ToastController, FirebaseProvider, NavController, NavParams])
    ], HorariosPage);
    return HorariosPage;
}());
export { HorariosPage };
//# sourceMappingURL=horarios.js.map