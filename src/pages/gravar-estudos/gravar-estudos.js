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
import { IonicPage, NavController, NavParams, ToastController, AlertController, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * Generated class for the GravarEstudosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var pause = false;
var md5 = require("js-md5");
var GravarEstudosPage = /** @class */ (function () {
    function GravarEstudosPage(localNotifications, viewCtrl, alertCtrl, database, toastCtrl, navCtrl, navParams) {
        this.localNotifications = localNotifications;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.database = database;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tipoEstudo = "teoria";
        this.materia = "0";
        this.tipoTempo = "cronometro";
        this.revisoes = "sim";
        this.descricao = "";
        this.tema = "";
        this.hora = "";
        this.minuto = "";
        this.alerta = false;
        this.exercicios = 0;
        this.acertos = 0;
        var aux = new Date();
        this.dataAtual = aux.getFullYear();
        if (aux.getMonth() < 9) {
            this.dataAtual += "-0" + (aux.getMonth() + 1);
        }
        else {
            this.dataAtual += "-" + (aux.getMonth() + 1);
        }
        if (aux.getDate() < 10) {
            this.dataAtual += "-0" + (aux.getDate());
        }
        else {
            this.dataAtual += "-" + (aux.getDate());
        }
        this.data = this.dataAtual;
    }
    GravarEstudosPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.database.getListaMaterias()];
                    case 1:
                        _a.array_materias = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GravarEstudosPage.prototype.iniciarEstudo = function () {
        if (cronometro == undefined) {
            this.tempo = "";
            var s = 1;
            var m = 0;
            var h = 0;
            var ref_1 = this;
            console.log(cronometro);
            cronometro = setInterval(function () {
                if (!pause) {
                    var a = document.getElementById("btnIniciar");
                    a.name = "pause";
                    document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Pausar</strong>";
                    ref_1.tempo = "";
                    if (s == 60) {
                        m++;
                        s = 0;
                    }
                    if (m == 60) {
                        h++;
                        s = 0;
                        m = 0;
                    }
                    if (h < 10)
                        ref_1.tempo += "0" + h + ":";
                    else
                        ref_1.tempo += h + ":";
                    if (m < 10)
                        ref_1.tempo += "0" + m + ":";
                    else
                        ref_1.tempo += m + ":";
                    if (s < 10)
                        ref_1.tempo += "0" + s;
                    else
                        ref_1.tempo += s;
                    s++;
                    document.getElementById("tempo").innerHTML = ref_1.tempo;
                }
            }, 1000);
        }
        else {
            pause = !pause;
            var a = document.getElementById("btnIniciar");
            a.name = "pause";
            document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Retomar</strong>";
        }
    };
    GravarEstudosPage.prototype.gravar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tempo, ref, toast, a, ref, toast, alertAux, alertAux;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.materia != "0")) return [3 /*break*/, 6];
                        if (this.tipoTempo == "cronometro") {
                            tempo = this.tempo.split(":");
                            if (parseInt(tempo[1]) < 1) {
                                ref = this;
                                toast = this.toastCtrl.create({
                                    message: "É NESCESSARIO ESTUDAR AO MENOS 1 MINUTO PARA PODER GRAVA-LO",
                                    duration: 3000,
                                    position: 'top',
                                    cssClass: "toastErro"
                                });
                                toast.present();
                                return [2 /*return*/];
                            }
                            else {
                                clearInterval(cronometro);
                                cronometro = undefined;
                                a = document.getElementById("btnIniciar");
                                a.name = "play";
                                document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Iniciar</strong>";
                            }
                        }
                        else {
                            if (this.minuto > 1) {
                                this.tempo = this.hora + ":" + this.minuto + ":00";
                            }
                            else {
                                ref = this;
                                toast = this.toastCtrl.create({
                                    message: "É NESCESSARIO ESTUDAR AO MENOS 1 MINUTO PARA PODER GRAVA-LO",
                                    duration: 3000,
                                    position: 'top',
                                    cssClass: "toastErro"
                                });
                                toast.present();
                                return [2 /*return*/];
                            }
                        }
                        if (!(this.revisoes == "sim")) return [3 /*break*/, 4];
                        if (!(this.tema != "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.database.cadastrarRevisoes(this.materia, this.tema)
                                .catch(function (erro) {
                                var ref = _this;
                                var toast = _this.toastCtrl.create({
                                    message: erro,
                                    duration: 3000,
                                    position: 'middle',
                                    cssClass: "toastErro"
                                });
                                toast.present();
                            })];
                    case 1:
                        _a.sent();
                        this.database.cadastrarEstudo({ tempo: this.tempo, tipo: this.tipoEstudo, tema: this.tema, descricao: this.descricao, revisao: this.revisoes, exercicios: this.exercicios, acertos: this.acertos }, this.data, this.materia)
                            .then(function () {
                            var ref = _this;
                            var toast = _this.toastCtrl.create({
                                message: "TEMPO DE ESTUDO SALVO COM SUCESSO!",
                                duration: 3000,
                                position: 'top',
                                cssClass: "toastSucesso"
                            });
                            toast.present();
                        })
                            .catch(function (erro) {
                            var ref = _this;
                            var toast = _this.toastCtrl.create({
                                message: erro,
                                duration: 3000,
                                position: 'top',
                                cssClass: "toastErro"
                            });
                            toast.present();
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        alertAux = this.alertCtrl.create({
                            title: "Ops! :(",
                            message: "É NESCESSARIO INSERIR UM TEMA PARA PODER CRIAR REVISÕES!",
                            cssClass: "alerta"
                        });
                        alertAux.present();
                        pause = true;
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.database.cadastrarEstudo({ tempo: this.tempo, tipo: this.tipoEstudo, tema: this.tema, descricao: this.descricao, revisao: this.revisoes, exercicios: this.exercicios, acertos: this.acertos }, this.data, this.materia)
                            .then(function () {
                            var ref = _this;
                            var toast = _this.toastCtrl.create({
                                message: "TEMPO DE ESTUDO SALVO COM SUCESSO!",
                                duration: 3000,
                                position: 'top',
                                cssClass: "toastSucesso"
                            });
                            toast.present();
                        })
                            .catch(function (erro) {
                            var ref = _this;
                            var toast = _this.toastCtrl.create({
                                message: erro,
                                duration: 3000,
                                position: 'top',
                                cssClass: "toastErro"
                            });
                            toast.present();
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        alertAux = this.alertCtrl.create({
                            title: "Ops! :(",
                            message: "É NESCESSARIO SELECIONAR UMA MATERIA PARA GRAVAR O ESTUDO!",
                            cssClass: "alerta"
                        });
                        alertAux.present();
                        pause = true;
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    GravarEstudosPage.prototype.cancelar = function () {
        var alertAux = this.alertCtrl.create({
            title: "ATENÇÃO",
            message: "TEM CERTEZA QUE DESEJA CANCELAR?",
            cssClass: "alerta",
            buttons: [{
                    text: 'SIM',
                    handler: function () {
                        clearInterval(cronometro);
                        cronometro = undefined;
                        var a = document.getElementById("btnIniciar");
                        a.name = "play";
                        document.getElementById("btnIniciar").innerHTML = "&nbsp;&nbsp;<strong>Iniciar</strong>";
                        document.getElementById("tempo").innerHTML = "00:00:00";
                    }
                },
                {
                    text: "NÃO",
                    role: 'cancel'
                }]
        });
        alertAux.present();
    };
    GravarEstudosPage.prototype.programarAlerta = function (alerta) {
        var _this = this;
        if (this.alerta) {
            var alertAux = this.alertCtrl.create({
                title: "Criar Alerta?",
                message: "DIGITE OS MINUTOS PARA QUE VOCÊ SEJA NOTIFICADO!",
                inputs: [
                    {
                        name: "minutos",
                        placeholder: "Minutos",
                        type: "number",
                        max: "2"
                    }
                ],
                buttons: [
                    {
                        text: "Salvar",
                        role: "save"
                    },
                    {
                        text: "Cancelar",
                        role: "cancel"
                    }
                ],
                cssClass: "alerta"
            });
            alertAux.present();
            alertAux.onDidDismiss(function (dados) {
                if (dados.minutos == "") {
                    var alertAux_1 = _this.alertCtrl.create({
                        title: "ATENÇÃO",
                        message: "VOCÊ NÃO DIGITOU NENHUM TEMPO!"
                    });
                    alertAux_1.present();
                    alert();
                }
                if (cronometro == undefined) {
                    var alertAux_2 = _this.alertCtrl.create({
                        title: "ATENÇÃO",
                        message: "VOCÊ DEVE DISPARAR O CRONOMETRO PRIMEIRO ANTES DE INICIAR O ALARME!"
                    });
                    alertAux_2.present();
                }
                else {
                    var alarme = {
                        id: 1,
                        title: "Caixola Estudos",
                        text: 'Fim dos Estudos!!',
                        trigger: { at: new Date(new Date().getTime() + Number(dados.minutos) * 60000) },
                        vibrate: true
                    };
                    _this.localNotifications.schedule(alarme);
                    var ref = _this;
                    var toast = _this.toastCtrl.create({
                        message: "ALARME CRIADO COM SUCESSO!",
                        duration: 3000,
                        position: 'top',
                        cssClass: "toastSucesso"
                    });
                    toast.present()
                        .then(function () {
                    });
                }
            });
        }
    };
    GravarEstudosPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-gravar-estudos',
            templateUrl: 'gravar-estudos.html',
        }),
        __metadata("design:paramtypes", [LocalNotifications, ViewController, AlertController, FirebaseProvider, ToastController, NavController, NavParams])
    ], GravarEstudosPage);
    return GravarEstudosPage;
}());
export { GravarEstudosPage };
//# sourceMappingURL=gravar-estudos.js.map