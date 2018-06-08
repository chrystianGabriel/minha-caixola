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
import { Platform, AlertController, ModalController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { HorariosPage } from '../pages/horarios/horarios';
import { GravarEstudosPage } from '../pages/gravar-estudos/gravar-estudos';
import { MinhasMateriaPage } from '../pages/minhas-materia/minhas-materia';
import { DesempenhoPage } from "../pages/desempenho/desempenho";
import { FirebaseProvider } from "../providers/firebase/firebase";
var MyApp = /** @class */ (function () {
    function MyApp(modalCtrl, database, alertCtrl, keyboard, platform, statusBar, splashScreen) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.database = database;
        this.alertCtrl = alertCtrl;
        this.rootPage = LoginPage;
        this.inicio = HomePage;
        this.minhasMateria = MinhasMateriaPage;
        this.horarios = HorariosPage;
        this.gravar_estudo = GravarEstudosPage;
        this.desempenho = DesempenhoPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            keyboard.disableScroll(true);
            statusBar.styleDefault();
            splashScreen.hide();
            _this.database.receberMensagem();
        });
    }
    MyApp.prototype.abrirPagina = function (pagina) {
        if (cronometro == undefined) {
            this.rootPage = pagina;
        }
        else {
            var alertAux = this.alertCtrl.create({
                title: "ATENÇÃO",
                message: "PARA FECHAR ESTÁ PAGINA VOCÊ DEVE CANCELAR OU GRAVAR O TEMPO DE ESTUDO!"
            });
            alertAux.present();
        }
    };
    MyApp.prototype.cadastrarMeta = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ref, tempo, horas, minutos, a, alertAux;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ref = this;
                        return [4 /*yield*/, this.database.getMetaSemanal()];
                    case 1:
                        tempo = _a.sent();
                        if (!tempo)
                            tempo = "00:00:00";
                        tempo = tempo.split(":");
                        horas = tempo[0];
                        minutos = tempo[1];
                        a = {
                            title: "ATENÇÃO",
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
                                                    return [4 /*yield*/, ref.database.cadastrarMetaSemanal(data.horas, data.minutos)];
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
                        alertAux = this.alertCtrl.create(a);
                        alertAux.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [ModalController, FirebaseProvider, AlertController, Keyboard, Platform, StatusBar, SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map