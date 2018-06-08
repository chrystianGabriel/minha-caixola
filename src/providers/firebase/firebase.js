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
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Http, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
var md5 = require("js-md5");
var FirebaseProvider = /** @class */ (function () {
    function FirebaseProvider(alertCtrl, http, oneSignal) {
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.oneSignal = oneSignal;
    }
    FirebaseProvider.prototype.getUsuario = function () {
        return firebase.auth().currentUser.uid;
    };
    FirebaseProvider.prototype.cadastrarMateria = function (materia) {
        var ref = this;
        return new Promise(function (sucesso, erro) {
            return __awaiter(this, void 0, void 0, function () {
                var existe;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ref.getMateria(md5(materia.nome))];
                        case 1:
                            existe = _a.sent();
                            if (existe) {
                                erro("MATERIA JÁ CADASTRADA!");
                            }
                            firebase.database().ref(firebase.auth().currentUser.uid + "/materias/" + md5(materia.nome)).set(materia)
                                .then(function (e) {
                                sucesso(true);
                            })
                                .catch(function (e) {
                                erro(e);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    FirebaseProvider.prototype.cadastrarEstudo = function (estudo, data, materia) {
        var ref = this;
        return new Promise(function (sucesso, erro) {
            return __awaiter(this, void 0, void 0, function () {
                var estudoAnterior, key, tempoAnterior, tempoAtual, hora, minutos;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, firebase.database().ref(firebase.auth().currentUser.uid + '/estudos/' + md5(materia)).once("value")];
                        case 1:
                            estudoAnterior = _a.sent();
                            console.log(estudoAnterior.val());
                            if (estudoAnterior.val() != null) {
                                estudoAnterior = estudoAnterior.val()[data];
                                if (estudoAnterior != undefined) {
                                    key = Object.keys(estudoAnterior)[0];
                                    estudoAnterior = estudoAnterior[key];
                                    tempoAnterior = estudoAnterior.tempo.split(":");
                                    tempoAtual = estudo.tempo.split(":");
                                    hora = parseInt(tempoAnterior[0]) + parseInt(tempoAtual[0]);
                                    minutos = (parseFloat(tempoAnterior[1]) / 60) + (parseFloat(tempoAtual[1]) / 60);
                                    hora += Math.round(minutos);
                                    minutos = ((minutos - Math.round(minutos)) * 60).toFixed(0);
                                    console.log(hora);
                                    console.log(minutos);
                                    if (hora < 10) {
                                        hora = "0" + hora.toString();
                                    }
                                    if (minutos < 10) {
                                        minutos = "0" + minutos.toString();
                                    }
                                    console.log(hora);
                                    console.log(minutos);
                                    estudo.tempo = hora + ":" + minutos + ":00";
                                    firebase.database().ref(firebase.auth().currentUser.uid + '/estudos/' + md5(materia) + "/" + data + "/" + key).set(estudo)
                                        .then(function () {
                                        console.log("pipoca");
                                        sucesso(true);
                                    })
                                        .catch(function () {
                                        erro("ERRO! NÃO FOI POSSIVEL CADASTRAR O TEMPO DE ESTUDO");
                                    });
                                }
                                else {
                                    firebase.database().ref(firebase.auth().currentUser.uid + '/estudos/' + md5(materia) + "/" + data).push(estudo)
                                        .then(function () {
                                        sucesso(true);
                                    })
                                        .catch(function () {
                                        erro("ERRO! NÃO FOI POSSIVEL CADASTRAR O TEMPO DE ESTUDO");
                                    });
                                }
                            }
                            else {
                                firebase.database().ref(firebase.auth().currentUser.uid + '/estudos/' + md5(materia) + "/" + data).push(estudo)
                                    .then(function () {
                                    sucesso(true);
                                })
                                    .catch(function () {
                                    erro("ERRO! NÃO FOI POSSIVEL CADASTRAR O TEMPO DE ESTUDO");
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    FirebaseProvider.prototype.cadastrarTema = function (tema, materia) {
        return new Promise(function (sucesso, erro) {
            firebase.database().ref(firebase.auth().currentUser.uid + '/temas/' + materia).set(tema)
                .then(function () {
                sucesso(true);
            })
                .catch(function () {
                erro(false);
            });
        });
    };
    FirebaseProvider.prototype.login = function (email, senha) {
        return new Promise(function (sucesso, erro) {
            firebase.auth().signInWithEmailAndPassword(email, senha)
                .then(function () {
                sucesso(true);
            })
                .catch(function (error) {
                if (error.code == "auth/invalid-email") {
                    erro("ERRO! O E-MAIL DIGITADO É INVALIDO!");
                }
                else if (error.code == "auth/user-disabled") {
                    erro("ERRO! O USUÁRIO FOI DESATIVADO!");
                }
                else if (error.code == "auth/user-not-found") {
                    erro("ERRO! E-MAIL NÃO ENCONTRADO!");
                }
                else if (error.code == "auth/wrong-password") {
                    erro("ERRO! SENHA DIGITADA INCORRETA!");
                }
            });
        });
    };
    FirebaseProvider.prototype.cadastrarHorarios = function (dia_semana, materia) {
        var ref = this;
        return new Promise(function (sucesso, erro) {
            return __awaiter(this, void 0, void 0, function () {
                var existe;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ref.deletarMateriaDia(dia_semana, md5(materia))];
                        case 1:
                            existe = _a.sent();
                            firebase.database().ref(firebase.auth().currentUser.uid + '/horarios/' + dia_semana).push({ materia: md5(materia) })
                                .then(function () {
                                sucesso(true);
                            })
                                .catch(function () {
                                erro("ERRO! NÃO FOI POSSIVEL CADASTRAR O TEMPO DE ESTUDO");
                            });
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    FirebaseProvider.prototype.getMateria = function (materiaCodgio) {
        return new Promise(function (sucesso, erro) {
            firebase.database().ref(firebase.auth().currentUser.uid + '/materias/' + materiaCodgio).once('value')
                .then(function (materia) {
                if (materia.val() != null) {
                    sucesso(materia.val());
                }
                else {
                    sucesso(false);
                }
            });
        });
    };
    FirebaseProvider.prototype.getListaMaterias = function () {
        return new Promise(function (sucesso, erro) {
            firebase.database().ref(firebase.auth().currentUser.uid + '/materias/').once('value')
                .then(function (materias) {
                if (materias.val() != null) {
                    var aux = materias.val();
                    var array_materias = new Array();
                    for (var key in aux) {
                        array_materias.push(aux[key]);
                    }
                    sucesso(array_materias);
                }
                else {
                    sucesso(false);
                }
            });
        });
    };
    FirebaseProvider.prototype.getMateriasDiaSemana = function (dia_semana) {
        var ref = this;
        return new Promise(function (sucesso, erro) {
            var _this = this;
            firebase.database().ref(firebase.auth().currentUser.uid + '/horarios/' + dia_semana).once("value")
                .then(function (materias) { return __awaiter(_this, void 0, void 0, function () {
                var aux, array_materia, _a, _b, _i, key, materia;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!materias.val()) return [3 /*break*/, 5];
                            aux = materias.val();
                            array_materia = new Array();
                            _a = [];
                            for (_b in aux)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            key = _a[_i];
                            return [4 /*yield*/, ref.getMateria(aux[key].materia)];
                        case 2:
                            materia = _c.sent();
                            if (materia != false) {
                                array_materia.push(materia);
                            }
                            _c.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            sucesso(array_materia);
                            return [3 /*break*/, 6];
                        case 5:
                            sucesso(false);
                            _c.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    FirebaseProvider.prototype.deletarMateriaDia = function (dia_semana, codigo_materia) {
        return new Promise(function (sucesso, erro) {
            firebase.database().ref(firebase.auth().currentUser.uid + '/horarios/' + dia_semana).once('value')
                .then(function (materia) {
                var materias = materia.val();
                for (var key in materias) {
                    if (materias[key].materia == codigo_materia) {
                        delete materias[key];
                    }
                }
                firebase.database().ref(firebase.auth().currentUser.uid + '/horarios/' + dia_semana).set(materias);
                sucesso(true);
            })
                .catch(function () {
                erro(false);
            });
        });
    };
    FirebaseProvider.prototype.deletarMateria = function (materia_nome) {
        var _this = this;
        var ref = this;
        return new Promise(function (sucesso, erro) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 7)) return [3 /*break*/, 4];
                        return [4 /*yield*/, ref.deletarMateriaDia(i, md5(materia_nome))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        firebase.database().ref(firebase.auth().currentUser.uid + '/materias/').once('value')
                            .then(function (materias) { return __awaiter(_this, void 0, void 0, function () {
                            var materia, key;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        materia = materias.val();
                                        for (key in materia) {
                                            if (materia[key].nome == materia_nome) {
                                                delete materia[key];
                                            }
                                        }
                                        return [4 /*yield*/, firebase.database().ref(firebase.auth().currentUser.uid + '/materias/').set(materia)];
                                    case 1:
                                        _a.sent();
                                        sucesso(true);
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (e) {
                            erro(e);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    FirebaseProvider.prototype.getEstudos = function (nome_materia) {
        var ref = this;
        return new Promise(function (sucesso, erro) {
            firebase.database().ref(firebase.auth().currentUser.uid + "/estudos/" + md5(nome_materia)).once('value')
                .then(function (estudos) {
                if (estudos.val() != null) {
                    var array_estudos = new Array();
                    var aux = estudos.val();
                    for (var key in aux) {
                        for (var key1 in aux[key]) {
                            aux[key][key1].data = key.substring(8, 10) + '/' + key.substring(5, 7) + '/' + key.substring(0, 4);
                            array_estudos.push(aux[key][key1]);
                        }
                    }
                    sucesso(array_estudos);
                }
                else {
                    sucesso(false);
                }
            })
                .catch(function (e) {
                erro(e);
            });
        });
    };
    FirebaseProvider.prototype.getEstudosData = function (nome_materia, data) {
        var ref = this;
        return new Promise(function (sucesso, erro) {
            firebase.database().ref(firebase.auth().currentUser.uid + "/estudos/" + md5(nome_materia) + "/" + data).once('value')
                .then(function (estudos) {
                if (estudos.val() != null) {
                    var estudo = estudos.val();
                    var key = Object.keys(estudo)[0];
                    sucesso(estudo[key]);
                }
                else {
                    sucesso(false);
                }
            })
                .catch(function (e) {
                erro(e);
            });
        });
    };
    FirebaseProvider.prototype.editMateria = function (novaMateria, materiaAntiga) {
        var _this = this;
        return new Promise(function (sucesso, erro) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var _loop_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(novaMateria.nome != materiaAntiga.nome)) return [3 /*break*/, 8];
                        return [4 /*yield*/, firebase.database().ref(firebase.auth().currentUser.uid + '/materias/' + md5(materiaAntiga.nome)).remove()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cadastrarMateria(novaMateria)];
                    case 2:
                        _a.sent();
                        _loop_1 = function (i) {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, firebase.database().ref(firebase.auth().currentUser.uid + '/horarios/' + i).once('value')
                                            .then(function (horarios) {
                                            var horariosAux = horarios.val();
                                            for (var key in horariosAux) {
                                                if (md5(materiaAntiga.nome) == horariosAux[key].materia) {
                                                    horariosAux[key].materia = md5(novaMateria.nome);
                                                }
                                            }
                                            firebase.database().ref(firebase.auth().currentUser.uid + '/horarios/' + i).set(horariosAux);
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < 7)) return [3 /*break*/, 6];
                        return [5 /*yield**/, _loop_1(i)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, firebase.database().ref(firebase.auth().currentUser.uid + '/estudos/' + md5(materiaAntiga.nome)).once('value')
                            .then(function (estudos) { return __awaiter(_this, void 0, void 0, function () {
                            var novoEstudo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        novoEstudo = estudos.val();
                                        return [4 /*yield*/, firebase.database().ref(firebase.auth().currentUser.uid + '/estudos/' + md5(materiaAntiga.nome)).remove()];
                                    case 1:
                                        _a.sent();
                                        firebase.database().ref(firebase.auth().currentUser.uid + '/estudos/' + md5(novaMateria.nome)).set(novoEstudo);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 7:
                        _a.sent();
                        sucesso(true);
                        return [3 /*break*/, 9];
                    case 8:
                        firebase.database().ref(firebase.auth().currentUser.uid + '/materias/' + md5(materiaAntiga.nome)).set(novaMateria)
                            .then(function () {
                            sucesso("AS ALTERAÇÕES FORAM SALVAS COM SUCESSO");
                        })
                            .catch(function () {
                            erro("HOUVE ALGUM ERRO AO TENTAR ALTERAR, POR FAVOR, TENTE NOVAMENTE!");
                        });
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        }); });
    };
    FirebaseProvider.prototype.cadastrarMetaSemanal = function (horas, minutos) {
        return new Promise(function (sucesso, erro) {
            firebase.database().ref(firebase.auth().currentUser.uid + "/meta_semanal").set({ meta: (parseInt(horas) < 10 ? "0" + horas : horas) + ":" + (parseInt(minutos) < 10 ? "0" + minutos : minutos) + ":00" })
                .then(function () {
                sucesso(true);
            })
                .catch(function () {
                erro("NÃO FOI POSSIVEL SALVAR META SEMANAL,POR FAVOR, TENTE NOVAMENTE!");
            });
        });
    };
    FirebaseProvider.prototype.getMetaSemanal = function () {
        return new Promise(function (sucesso, erro) {
            firebase.database().ref(firebase.auth().currentUser.uid + "/meta_semanal").once('value')
                .then(function (meta) {
                if (meta.val()) {
                    sucesso(meta.val().meta);
                }
                else {
                    sucesso(false);
                }
            })
                .catch(function () {
                erro(false);
            });
        });
    };
    FirebaseProvider.prototype.cadastrarRevisoes = function (nome_materia, tema) {
        var _this = this;
        return new Promise(function (sucesso, erro) { return __awaiter(_this, void 0, void 0, function () {
            var revisoes, revisao24h, revisao7d, revisao30d;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRevisoes(nome_materia)];
                    case 1:
                        revisoes = _a.sent();
                        if (!revisoes) {
                            revisao24h = new Date(new Date().setDate(new Date().getDate() + 1));
                            revisao7d = new Date(new Date().setDate(new Date().getDate() + 7));
                            revisao30d = new Date(new Date().setDate(new Date().getDate() + 30));
                            revisao24h = revisao24h.getFullYear() + "-" + (revisao24h.getMonth() + 1 < 10 ? "0" + (revisao24h.getMonth() + 1) : revisao24h.getMonth() + 1) + "-" + (revisao24h.getDate() + 1 < 10 ? "0" + revisao24h.getDate() : revisao24h.getDate());
                            revisao7d = revisao7d.getFullYear() + "-" + (revisao7d.getMonth() + 1 < 10 ? "0" + (revisao7d.getMonth() + 1) : revisao7d.getMonth() + 1) + "-" + (revisao7d.getDate() < 10 ? "0" + revisao7d.getDate() : revisao7d.getDate());
                            revisao30d = revisao30d.getFullYear() + "-" + (revisao30d.getMonth() + 1 < 10 ? "0" + (revisao30d.getMonth() + 1) : revisao30d.getMonth() + 1) + "-" + (revisao30d.getDate() < 10 ? "0" + revisao30d.getDate() : revisao30d.getDate());
                            firebase.database().ref(firebase.auth().currentUser.uid + "/revisoes/" + md5(nome_materia)).set({ revisao24h: revisao24h, revisao7d: revisao7d, revisao30d: revisao30d, tema: tema })
                                .then(function () {
                                sucesso(true);
                            })
                                .catch(function (e) {
                                erro(e);
                            });
                        }
                        else {
                            erro("JÁ EXISTE REVISÕES PARA ESTA MATERIA,ELAS SERÃO MANTIDAS");
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    FirebaseProvider.prototype.getRevisoes = function (nome_materia) {
        return new Promise(function (sucesso, erro) {
            firebase.database().ref(firebase.auth().currentUser.uid + "/revisoes/" + md5(nome_materia)).once('value')
                .then(function (revisao) {
                if (revisao.val() != null) {
                    sucesso(revisao.val());
                }
                else {
                    sucesso(false);
                }
            })
                .catch(function () {
                erro(false);
            });
        });
    };
    FirebaseProvider.prototype.cadastrarUsuario = function (email, senha) {
        return new Promise(function (sucesso, erro) {
            firebase.auth().createUserWithEmailAndPassword(email, senha)
                .then(function () {
                sucesso(true);
            })
                .catch(function (error) {
                console.log(error);
                if (error.code == "auth/invalid-email") {
                    erro("ERRO! O E-MAIL DIGITADO É INVALIDO!");
                }
                else if (error.code == "auth/user-disabled") {
                    erro("ERRO! O USUÁRIO FOI DESATIVADO!");
                }
                else if (error.code == "auth/user-not-found") {
                    erro("ERRO! E-MAIL NÃO ENCONTRADO!");
                }
                else if (error.code == "auth/wrong-password") {
                    erro("ERRO! SENHA DIGITADA INCORRETA!");
                }
                else if (error.code == "auth/email-already-in-use") {
                    erro("ERRO! E-MAIL JÁ EM USO");
                }
            });
        });
    };
    FirebaseProvider.prototype.receberMensagem = function () {
        this.oneSignal.startInit('1792b60b-ef6b-4be2-9c89-60dc221851aa', '79977732972');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(function (data) {
        });
        this.oneSignal.handleNotificationOpened().subscribe(function (data) {
            alert(data.notification.payload.body);
        });
        this.oneSignal.endInit();
    };
    FirebaseProvider.prototype.enviarMensagem = function (mensagem) {
        this.oneSignal.registerForPushNotifications();
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Basic NzBjZmNmNmUtMWRkYS00Mzk4LWI0NDAtODYzMjIyMDQwNTk5");
        var body = {
            "app_id": "1792b60b-ef6b-4be2-9c89-60dc221851aa",
            "contents": { "en": mensagem },
            "included_segments": ["All"]
        };
        this.http.post("https://onesignal.com/api/v1/notifications", JSON.stringify(body), { headers: headers })
            .subscribe(function (data) {
            console.log(data);
        });
    };
    FirebaseProvider.prototype.equeciMinhaSenha = function (email) {
        return new Promise(function (sucesso, erro) {
            firebase.auth().sendPasswordResetEmail(email)
                .then(function () {
            });
        });
    };
    FirebaseProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AlertController, Http, OneSignal])
    ], FirebaseProvider);
    return FirebaseProvider;
}());
export { FirebaseProvider };
//# sourceMappingURL=firebase.js.map