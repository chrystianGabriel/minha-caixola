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
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { FirebaseProvider } from '../../providers/firebase/firebase';
/**
 * Generated class for the DesempenhoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var i = 0;
var DesempenhoPage = /** @class */ (function () {
    function DesempenhoPage(loadCtrl, database, navCtrl, navParams) {
        this.loadCtrl = loadCtrl;
        this.database = database;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tipo = "bar";
        this.labels = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];
        this.intervalo = "semanal";
        this.desempenhoDiario = undefined;
    }
    DesempenhoPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graficoDiario()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.graficoGeral()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.graficoSemanal()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.graficoDiario()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DesempenhoPage.prototype.getDatasSemana = function () {
        var dia = new Date().getDate() + (6 - new Date().getDay());
        var mes = new Date().getMonth() + 1;
        var ano = new Date().getFullYear();
        if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
            var datas_semana = [ano + (mes < 10 ? "-0" : "-") + (dia - 6 > 31 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 6 > 31 ? (dia - 31) - 6 : dia - 6),
                ano + (mes < 10 ? "-0" : "-") + (dia - 5 > 31 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 5 > 31 ? (dia - 31) - 5 : dia - 5),
                ano + (mes < 10 ? "-0" : "-") + (dia - 4 > 31 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 4 > 31 ? (dia - 31) - 4 : dia - 4),
                ano + (mes < 10 ? "-0" : "-") + (dia - 3 > 31 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 3 > 31 ? (dia - 31) - 3 : dia - 3),
                ano + (mes < 10 ? "-0" : "-") + (dia - 2 > 31 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 2 > 31 ? (dia - 31) - 2 : dia - 2),
                ano + (mes < 10 ? "-0" : "-") + (dia - 1 > 31 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 1 > 31 ? (dia - 31) - 1 : dia - 1),
                ano + (mes < 10 ? "-0" : "-") + (dia > 31 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia > 31 ? (dia - 31) : dia)];
            return datas_semana;
        }
        else if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
            var datas_semana = [ano + (mes < 10 ? "-0" : "-") + (dia - 6 > 30 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 6 > 30 ? (dia - 30) - 6 : dia - 6),
                ano + (mes < 10 ? "-0" : "-") + (dia - 5 > 30 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 5 > 30 ? (dia - 30) - 5 : dia - 5),
                ano + (mes < 10 ? "-0" : "-") + (dia - 4 > 30 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 4 > 30 ? (dia - 30) - 4 : dia - 4),
                ano + (mes < 10 ? "-0" : "-") + (dia - 3 > 30 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 3 > 30 ? (dia - 30) - 3 : dia - 3),
                ano + (mes < 10 ? "-0" : "-") + (dia - 2 > 30 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 2 > 30 ? (dia - 30) - 2 : dia - 2),
                ano + (mes < 10 ? "-0" : "-") + (dia - 1 > 30 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 1 > 30 ? (dia - 30) - 1 : dia - 1),
                ano + (mes < 10 ? "-0" : "-") + (dia > 30 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia > 30 ? (dia - 30) : dia)];
            return datas_semana;
        }
        else if (new Date(ano, 1, 29).getMonth() != 1) {
            var datas_semana = [ano + (mes < 10 ? "-0" : "-") + (dia - 6 > 28 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 6 > 28 ? (dia - 28) - 6 : dia - 6),
                ano + (mes < 10 ? "-0" : "-") + (dia - 5 > 28 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 5 > 28 ? (dia - 28) - 5 : dia - 5),
                ano + (mes < 10 ? "-0" : "-") + (dia - 4 > 28 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 4 > 28 ? (dia - 28) - 4 : dia - 4),
                ano + (mes < 10 ? "-0" : "-") + (dia - 3 > 28 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 3 > 28 ? (dia - 28) - 3 : dia - 3),
                ano + (mes < 10 ? "-0" : "-") + (dia - 2 > 28 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 2 > 28 ? (dia - 28) - 2 : dia - 2),
                ano + (mes < 10 ? "-0" : "-") + (dia - 1 > 28 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 1 > 28 ? (dia - 28) - 1 : dia - 1),
                ano + (mes < 10 ? "-0" : "-") + (dia > 28 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia > 28 ? (dia - 28) : dia)];
            return datas_semana;
        }
        else {
            var datas_semana = [ano + (mes < 10 ? "-0" : "-") + (dia - 6 > 29 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 6 > 29 ? (dia - 29) - 6 : dia - 6),
                ano + (mes < 10 ? "-0" : "-") + (dia - 5 > 29 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 5 > 29 ? (dia - 29) - 5 : dia - 5),
                ano + (mes < 10 ? "-0" : "-") + (dia - 4 > 29 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 4 > 29 ? (dia - 29) - 4 : dia - 4),
                ano + (mes < 10 ? "-0" : "-") + (dia - 3 > 29 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 3 > 29 ? (dia - 29) - 3 : dia - 3),
                ano + (mes < 10 ? "-0" : "-") + (dia - 2 > 29 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 2 > 29 ? (dia - 29) - 2 : dia - 2),
                ano + (mes < 10 ? "-0" : "-") + (dia - 1 > 29 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia - 1 > 29 ? (dia - 29) - 1 : dia - 1),
                ano + (mes < 10 ? "-0" : "-") + (dia > 29 ? mes + 1 : mes) + (dia < 10 ? "-0" : "-") + (dia > 29 ? (dia - 29) : dia)];
            return datas_semana;
        }
    };
    DesempenhoPage.prototype.graficoSemanal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var materias, estudos, dias_semana, datasets, i_1, j, estudo, aux, nome, k, key, tempo, canvas, carregamento, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.getListaMaterias()];
                    case 1:
                        materias = _a.sent();
                        estudos = new Array();
                        dias_semana = this.getDatasSemana();
                        datasets = new Array();
                        i_1 = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i_1 < materias.length)) return [3 /*break*/, 7];
                        j = 0;
                        _a.label = 3;
                    case 3:
                        if (!(j < dias_semana.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.database.getEstudosData(materias[i_1].nome, dias_semana[j])];
                    case 4:
                        estudo = _a.sent();
                        if (estudo) {
                            estudo.nome = materias[i_1].nome;
                            estudo.cor = materias[i_1].cor;
                            aux = dias_semana[j].split("-");
                            estudo.index = new Date(parseInt(aux[0]), parseInt(aux[1]) - 1, parseInt(aux[2])).getDay();
                            datasets[estudo.nome] = {
                                data: [],
                                label: estudo.nome,
                                backgroundColor: materias[i_1].cor,
                                borderColor: "black",
                                borderWidth: 1
                            };
                            estudos.push(estudo);
                        }
                        _a.label = 5;
                    case 5:
                        j++;
                        return [3 /*break*/, 3];
                    case 6:
                        i_1++;
                        return [3 /*break*/, 2];
                    case 7:
                        if (estudos.length > 0) {
                            this.desempenhoDiario = "liberado";
                            nome = estudos[0].nome;
                            for (k = 0; k < estudos.length; k++) {
                                for (key in datasets) {
                                    if (key == estudos[k].nome) {
                                        tempo = estudos[k].tempo.split(":");
                                        datasets[estudos[k].nome].data[estudos[k].index] = ((parseFloat(tempo[0]) + (parseFloat(tempo[1]) / 60)).toFixed(2));
                                    }
                                    else {
                                        datasets[estudos[k].nome].data.push(0);
                                    }
                                }
                            }
                            canvas = document.getElementsByTagName("canvas");
                            if (canvas[1] != undefined) {
                                canvas[1].style.width = "100%";
                                carregamento = document.getElementsByClassName("carregamento")[1];
                                carregamento.style.display = "none";
                                this.desempenhoSemana = new Chart(this.graficoSemana.nativeElement, {
                                    type: this.tipo,
                                    data: {
                                        labels: this.labels,
                                        datasets: []
                                    },
                                    options: {
                                        scales: {
                                            yAxes: [{
                                                    ticks: {
                                                        beginAtZero: true,
                                                        callback: function (label, index, labels) {
                                                            var tempo = label.toString().split(".");
                                                            var hora = tempo[0];
                                                            var minutos = (parseFloat("0." + tempo[1]) * 60).toFixed(0).toString();
                                                            if (parseInt(hora) < 10) {
                                                                hora = "0" + hora;
                                                            }
                                                            if (parseInt(minutos) < 10) {
                                                                minutos = "0" + minutos.toString();
                                                            }
                                                            return hora + ":" + minutos + ":00";
                                                        }
                                                    }
                                                }]
                                        },
                                        tooltips: {
                                            callbacks: {
                                                label: function (tooltipItem, data) {
                                                    var tempo = tooltipItem.yLabel.toString().split(".");
                                                    var hora = tempo[0];
                                                    var minutos = (parseFloat("0." + tempo[1]) * 60).toFixed(0).toString();
                                                    if (parseInt(hora) < 10) {
                                                        hora = "0" + hora;
                                                    }
                                                    if (parseInt(minutos) < 10) {
                                                        minutos = "0" + minutos.toString();
                                                    }
                                                    return data.datasets[tooltipItem.datasetIndex].label + ": " + hora + ":" + minutos + ":00";
                                                }
                                            }
                                        }
                                    }
                                });
                                for (key in datasets) {
                                    this.desempenhoSemana.data.datasets.push(datasets[key]);
                                }
                                this.desempenhoSemana.update();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DesempenhoPage.prototype.graficoDiario = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data_atual, materias, datasets, estudos, i_2, estudo, aux, k, tempo, canvas, carregamento;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data_atual = this.getDatasSemana()[new Date().getDay()];
                        return [4 /*yield*/, this.database.getListaMaterias()];
                    case 1:
                        materias = _a.sent();
                        datasets = [{
                                data: [],
                                label: [],
                                backgroundColor: [],
                                borderColor: "black",
                                borderWidth: 1
                            }];
                        estudos = [];
                        i_2 = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i_2 < materias.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.database.getEstudosData(materias[i_2].nome, data_atual)];
                    case 3:
                        estudo = _a.sent();
                        if (estudo) {
                            estudo.nome = materias[i_2].nome;
                            estudo.cor = materias[i_2].cor;
                            aux = data_atual.split("-");
                            estudo.index = new Date(parseInt(aux[0]), parseInt(aux[1]) - 1, parseInt(aux[2])).getDay();
                            datasets[0].label.push(estudo.nome);
                            datasets[0].backgroundColor.push(estudo.cor);
                            estudos.push(estudo);
                        }
                        _a.label = 4;
                    case 4:
                        i_2++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (estudos.length > 0) {
                            this.desempenhoDiario = "liberado";
                            for (k = 0; k < estudos.length; k++) {
                                tempo = estudos[k].tempo.split(":");
                                datasets[0].data.push(((parseFloat(tempo[0]) + (parseFloat(tempo[1]) / 60)).toFixed(2)));
                            }
                            canvas = document.getElementsByTagName("canvas");
                            if (canvas[0] != undefined) {
                                canvas[0].style.width = "100%";
                                carregamento = document.getElementsByClassName("carregamento")[0];
                                carregamento.style.display = "none";
                                this.desempenhoDiario = new Chart(this.graficoDia.nativeElement, {
                                    type: 'doughnut',
                                    data: {
                                        labels: datasets[0].label,
                                        datasets: datasets
                                    },
                                    options: {
                                        scales: {
                                            yAxes: [{
                                                    ticks: {
                                                        display: false
                                                    }
                                                }]
                                        },
                                        tooltips: {
                                            callbacks: {
                                                label: function (tooltipItem, data) {
                                                    var tempo = datasets[0].data[tooltipItem.index].toString().split(".");
                                                    var hora = tempo[0];
                                                    var minutos = (parseFloat("0." + tempo[1]) * 60).toFixed(0).toString();
                                                    if (parseInt(hora) < 10) {
                                                        hora = "0" + hora;
                                                    }
                                                    if (parseInt(minutos) < 10) {
                                                        minutos = "0" + minutos.toString();
                                                    }
                                                    return data.datasets[0].label[tooltipItem.index] + ": " + hora + ":" + minutos + ":00";
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DesempenhoPage.prototype.graficoGeral = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data_atual, materias, datasets, hora, minuto, i_3, estudo, i_4, tempo, aux, canvas, carregamento;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data_atual = this.getDatasSemana()[new Date().getDay()];
                        return [4 /*yield*/, this.database.getListaMaterias()];
                    case 1:
                        materias = _a.sent();
                        datasets = [{
                                data: [],
                                label: [],
                                backgroundColor: [],
                                borderColor: "black",
                                borderWidth: 1
                            }];
                        hora = 0;
                        minuto = 0;
                        i_3 = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i_3 < materias.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.database.getEstudos(materias[i_3].nome)];
                    case 3:
                        estudo = _a.sent();
                        for (i_4 = 0; i_4 < estudo.length; i_4++) {
                            tempo = estudo[i_4].tempo.split(":");
                            hora += parseInt(tempo[0]);
                            minuto += parseFloat(tempo[1]) / 60;
                        }
                        if (estudo.length > 0) {
                            aux = data_atual.split("-");
                            datasets[0].label.push(materias[i_3].nome);
                            datasets[0].backgroundColor.push(materias[i_3].cor);
                            datasets[0].data.push(hora + minuto);
                            hora = 0;
                            minuto = 0;
                        }
                        _a.label = 4;
                    case 4:
                        i_3++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (datasets[0].data.length > 0) {
                            this.desempenhoDiario = "liberado";
                            canvas = document.getElementsByTagName("canvas");
                            if (canvas[2] != undefined) {
                                canvas[2].style.width = "100%";
                                carregamento = document.getElementsByClassName("carregamento")[2];
                                carregamento.style.display = "none";
                                this.desempenhoDiario = new Chart(this.graficoGera.nativeElement, {
                                    type: 'doughnut',
                                    data: {
                                        labels: datasets[0].label,
                                        datasets: datasets
                                    },
                                    options: {
                                        scales: {
                                            yAxes: [{
                                                    ticks: {
                                                        display: false
                                                    }
                                                }]
                                        },
                                        tooltips: {
                                            callbacks: {
                                                label: function (tooltipItem, data) {
                                                    var tempo = datasets[0].data[tooltipItem.index].toString().split(".");
                                                    var hora = tempo[0];
                                                    var minutos = (parseFloat("0." + tempo[1]) * 60).toFixed(0).toString();
                                                    if (parseInt(hora) < 10) {
                                                        hora = "0" + hora;
                                                    }
                                                    if (parseInt(minutos) < 10) {
                                                        minutos = "0" + minutos.toString();
                                                    }
                                                    return data.datasets[0].label[tooltipItem.index] + ": " + hora + ":" + minutos + ":00";
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        ViewChild('graficoSemanal'),
        __metadata("design:type", Object)
    ], DesempenhoPage.prototype, "graficoSemana", void 0);
    __decorate([
        ViewChild('graficoDiario'),
        __metadata("design:type", Object)
    ], DesempenhoPage.prototype, "graficoDia", void 0);
    __decorate([
        ViewChild('graficoGeral'),
        __metadata("design:type", Object)
    ], DesempenhoPage.prototype, "graficoGera", void 0);
    DesempenhoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-desempenho',
            templateUrl: 'desempenho.html',
        }),
        __metadata("design:paramtypes", [LoadingController, FirebaseProvider, NavController, NavParams])
    ], DesempenhoPage);
    return DesempenhoPage;
}());
export { DesempenhoPage };
//# sourceMappingURL=desempenho.js.map