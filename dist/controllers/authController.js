var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
import joi from 'joi';
import { faker } from '@faker-js/faker';
import * as meu from '../servide2/meus.js';
import * as repositories from '../repositories/meusRepos.js';
//const randomName = faker.name.findName(); // Willie Bahringer
//const randomEmail = faker.internet.email(); // Tomasa_Ferry14@hotmail.com
//var timestamp = new Date().getTime();
export function compras(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, cardSchema, validation, card, businesse, recharges, payments, recharge, payment, i, i, soma, timestamp, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    console.log(body);
                    cardSchema = joi.object({
                        "valor": joi.number().min(1).required(),
                        "id": joi.number().integer().required(),
                        "idloja": joi.number().integer().required(),
                        "senha": joi.string().length(4).pattern(/^[0-9]+$/).required()
                    });
                    validation = cardSchema.validate(req.body);
                    if (validation.error) {
                        return [2 /*return*/, res.status(422).send("oi XxxX oi")];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, meu.SomenteCartaoCadastrado(body)];
                case 2:
                    card = _a.sent();
                    return [4 /*yield*/, meu.bloquear(card)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, meu.verificaValidade(card)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, meu.SomenteCartaoAtivo2(card)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, meu.validarSenha(body, card)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, meu.EstabelecimentosCadastrados(body)];
                case 7:
                    businesse = _a.sent();
                    return [4 /*yield*/, meu.EstabelecimentoTipo(card, businesse)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, repositories.recharges(body)];
                case 9:
                    recharges = _a.sent();
                    return [4 /*yield*/, repositories.payments(body)];
                case 10:
                    payments = _a.sent();
                    recharge = 0;
                    payment = 0;
                    for (i = 0; i < recharges.rows.length; i++) {
                        recharge = recharge + recharges.rows[i].amount;
                    }
                    for (i = 0; i < payments.rows.length; i++) {
                        payment = payment + payments.rows[i].amount;
                    }
                    console.log(recharge - payment);
                    soma = recharge - payment;
                    if (body.valor > soma) {
                        return [2 /*return*/, res.status(401).send('valor insuficiente')];
                    }
                    timestamp = new Date();
                    return [4 /*yield*/, repositories.compras(timestamp, body)];
                case 11:
                    _a.sent();
                    res.status(201).send('Cartao atualizado com sucessoq!');
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _a.sent();
                    res.status(500).send(error_1);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
export function recargas(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, cardSchema, validation, card, date, hoje, time, cardValidade, timestamp, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    console.log(body);
                    cardSchema = joi.object({
                        "valor": joi.number().min(1).required(),
                        "id": joi.number().integer().required()
                    });
                    validation = cardSchema.validate(req.body);
                    if (validation.error) {
                        return [2 /*return*/, res.status(422).send("oi XxxX oi")];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, meu.SomenteCartaoCadastrado(body)];
                case 2:
                    card = _a.sent();
                    return [4 /*yield*/, meu.SomenteCartaoAtivo2(card)];
                case 3:
                    _a.sent();
                    console.log('1');
                    return [4 /*yield*/, meu.verificaValidade(card)];
                case 4:
                    _a.sent();
                    console.log('2');
                    date = new Date();
                    hoje = date.toLocaleDateString();
                    time = hoje.split("/");
                    cardValidade = card.rows[0].expirationDate;
                    timestamp = new Date();
                    console.log(timestamp);
                    if (time[1] >= cardValidade[1] && time[0] > cardValidade[0]) {
                        return [2 /*return*/, res.status(401).send('cartao fora da validade')];
                    }
                    console.log('3');
                    return [4 /*yield*/, repositories.recargas(timestamp, body)];
                case 5:
                    _a.sent();
                    console.log('4');
                    res.status(201).send('Cartao atualizado com sucesso!');
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    res.status(500).send(error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
export function cartaoDesBloquear(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, card, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    console.log(body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, meu.SomenteCartaoCadastrado(body)];
                case 2:
                    card = _a.sent();
                    return [4 /*yield*/, meu.desbloquear(card)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, meu.verificaValidade(card)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, meu.validarSenha(body, card)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, repositories.Desbloquear(body)];
                case 6:
                    _a.sent();
                    res.status(201).send('Cartao atualizado com sucesso!');
                    return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    res.status(500).send(error_3);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
export function cartaoBloquear(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, card, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    console.log(body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, meu.SomenteCartaoCadastrado(body)];
                case 2:
                    card = _a.sent();
                    return [4 /*yield*/, meu.bloquear(card)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, meu.verificaValidade(card)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, meu.validarSenha(body, card)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, repositories.Bloquear(body)];
                case 6:
                    _a.sent();
                    res.status(201).send('Cartao atualizado com sucesso!');
                    return [3 /*break*/, 8];
                case 7:
                    error_4 = _a.sent();
                    res.status(500).send(error_4);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
export function cartaoVisualizacao(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, card, recharges, payments, recharge, payment, paymentObject, rechargeObject, i, i, resposta, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    console.log(body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, meu.SomenteCartaoCadastrado(body)];
                case 2:
                    card = _a.sent();
                    console.log('oi');
                    return [4 /*yield*/, repositories.recharges(body)];
                case 3:
                    recharges = _a.sent();
                    console.log('oi');
                    return [4 /*yield*/, repositories.payments(body)];
                case 4:
                    payments = _a.sent();
                    recharge = 0;
                    payment = 0;
                    paymentObject = [];
                    rechargeObject = [];
                    for (i = 0; i < recharges.rows.length; i++) {
                        recharge = recharge + recharges.rows[i].amount;
                        rechargeObject.push(recharges.rows[i]);
                    }
                    for (i = 0; i < payments.rows.length; i++) {
                        payment = payment + payments.rows[i].amount;
                        paymentObject.push(payments.rows[i]);
                    }
                    resposta = {
                        "balance": recharge - payment,
                        "transactions": paymentObject,
                        "recharges": rechargeObject
                    };
                    console.log(recharge - payment);
                    res.status(201).send(resposta);
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    res.status(500).send(error_5);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function ativacaoCartao(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, cardSchema, validation, card, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    console.log(body);
                    cardSchema = joi.object({
                        "senha": joi.string().length(4).pattern(/^[0-9]+$/).required(),
                        "id": joi.number().integer().required(),
                        "cvc": joi.string().required()
                    });
                    validation = cardSchema.validate(req.body);
                    if (validation.error) {
                        return [2 /*return*/, res.status(422).send("oi XxxX oi")];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, meu.SomenteCartaoCadastrado(body)];
                case 2:
                    card = _a.sent();
                    console.log('1');
                    return [4 /*yield*/, meu.SomenteCartaoAtivo(card)];
                case 3:
                    _a.sent();
                    console.log('2');
                    return [4 /*yield*/, meu.verificaValidade(card)];
                case 4:
                    _a.sent();
                    console.log('3');
                    return [4 /*yield*/, meu.verificaCVC(card, body)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, meu.salvarSenha(body)];
                case 6:
                    _a.sent();
                    res.status(201).send('Cartao atualizado com sucesso!');
                    return [3 /*break*/, 8];
                case 7:
                    error_6 = _a.sent();
                    res.status(500).send(error_6);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
export function cardCreate(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authorization, token, body, cardSchema, validation, companie, employee, date, hoje, time, number, securityCode, fullname, namec, DataDeValidade, resposta, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authorization = req.headers.authorization;
                    token = authorization === null || authorization === void 0 ? void 0 : authorization.replace('Bearer ', '');
                    body = req.body;
                    cardSchema = joi.object({
                        "id": joi.number().integer().required(),
                        "type": joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health')
                    });
                    validation = cardSchema.validate(req.body);
                    if (validation.error) {
                        return [2 /*return*/, res.status(422).send("oi XxxX oi")];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, meu.verificaChave(token)];
                case 2:
                    companie = _a.sent();
                    console.log('1');
                    return [4 /*yield*/, meu.SomenteEmpregadosCadastrado(body)];
                case 3:
                    employee = _a.sent();
                    console.log('22');
                    return [4 /*yield*/, meu.verificaTipo(body)];
                case 4:
                    _a.sent();
                    date = new Date();
                    hoje = date.toLocaleDateString();
                    time = hoje.split("/");
                    number = faker.random.numeric(16);
                    securityCode = faker.random.numeric(4);
                    fullname = employee.rows[0].fullName.split(" ");
                    namec = fullname[0] + ' ' + fullname[(fullname[1].length >= 3 ? 1 : 2)][0] + ' ' + fullname[fullname.length - 1];
                    DataDeValidade = time[1] + "/" + (parseInt(time[2]) + 5);
                    resposta = {
                        employeeId: employee.rows[0].id,
                        number: number,
                        cardholderName: namec.toUpperCase(),
                        securityCode: securityCode,
                        expirationDate: DataDeValidade,
                        password: null,
                        isVirtual: true,
                        originalCardId: null,
                        isBlocked: false,
                        type: body.type
                    };
                    return [4 /*yield*/, repositories.criarCartao(resposta)];
                case 5:
                    _a.sent();
                    res.status(201).send('Usuário cadastrado com sucesso!');
                    return [3 /*break*/, 7];
                case 6:
                    error_7 = _a.sent();
                    res.status(500).send(error_7);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
