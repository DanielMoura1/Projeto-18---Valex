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
import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import bcrypt from 'bcrypt';
export function desbloquear(card) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (card.rows[0].isBlocked === false) {
                //return res.status(401).send('cartao nao está bloqueado')
                throw { code: 'NotFound', message: 'cartao nao está bloqueado' };
            }
            return [2 /*return*/];
        });
    });
}
export function bloquear(card) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (card.rows[0].isBlocked === true) {
                //return res.status(401).send('cartao ja está bloqueado')
                throw { code: 'NotFound', message: 'cartao está bloqueado' };
            }
            return [2 /*return*/];
        });
    });
}
export function SomenteEmpregadosCadastrado(body) {
    return __awaiter(this, void 0, void 0, function () {
        var employee;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories.employee(body)];
                case 1:
                    employee = _a.sent();
                    console.log('oi6');
                    if (employee.rows.length === 0) {
                        throw { code: 'NotFound', message: 'voce nao existe' };
                        //return res.status(401).send('voce nao existe')
                    }
                    return [2 /*return*/, employee];
            }
        });
    });
}
export function SomenteCartaoCadastrado(body) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories.card(body)];
                case 1:
                    card = _a.sent();
                    if (card.rows.length === 0) {
                        //return res.status(401).send('cartao nao existe')
                        throw { code: 'NotFound', message: 'cartao nao existe' };
                    }
                    return [2 /*return*/, card];
            }
        });
    });
}
export function SomenteCartaoAtivo(card) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (card.rows[0].password != null) {
                //return res.status(401).send('cartao ja ativado')
                throw { code: 'NotFound', message: 'cartao ja ativado' };
            }
            return [2 /*return*/];
        });
    });
}
export function SomenteCartaoAtivo2(card) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (card.rows[0].password === null) {
                //return res.status(401).send('cartao ja ativado')
                throw { code: 'NotFound', message: 'cartao nao ativado' };
            }
            return [2 /*return*/];
        });
    });
}
export function verificaCVC(card, body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (body.cvc != card.rows[0].securityCode) {
                //return res.status(401).send('cvc invalido')
                throw { code: 'NotFound', message: 'cvc invalido' };
            }
            return [2 /*return*/];
        });
    });
}
export function verificaSenha(card, body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (card.rows[0].password != null) {
                //return res.status(401).send('cartao ja ativado')
                throw { code: 'NotFound', message: 'cartao ja ativado' };
            }
            return [2 /*return*/];
        });
    });
}
export function verificaValidade(card) {
    return __awaiter(this, void 0, void 0, function () {
        var date, hoje, time, DataDeValidade, cardValidade;
        return __generator(this, function (_a) {
            console.log('::??');
            date = new Date();
            hoje = date.toLocaleDateString();
            time = hoje.split("/");
            DataDeValidade = time[1] + "/" + (parseInt(time[2]) + 5);
            console.log(card.rows);
            cardValidade = card.rows[0].expirationDate;
            console.log('_-');
            if (time[1] >= cardValidade[1] && time[0] > cardValidade[0]) {
                //return res.status(401).send('cartao  fora da validade')
                throw { code: 'NotFound', message: 'cartao  fora da validade' };
            }
            console.log('_-aff');
            return [2 /*return*/, DataDeValidade];
        });
    });
}
export function verificaChave(token) {
    return __awaiter(this, void 0, void 0, function () {
        var companie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories.VerificarPertenceEmpresa(token)];
                case 1:
                    companie = _a.sent();
                    console.log(companie.length);
                    if (companie.length === 0) {
                        throw { code: 'NotFound', message: 'key incorreta' };
                        //return res.status(401).send('key incorreta')
                    }
                    return [2 /*return*/, companie];
            }
        });
    });
}
export function verificaTipo(body) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('?');
                    console.log(body);
                    return [4 /*yield*/, connection.query('select * from cards where "employeeId" =$1 AND type =$2', [body.id, body.type])];
                case 1:
                    card = _a.sent();
                    console.log(card);
                    console.log('oi9');
                    if (card.rows.length > 0) {
                        console.log('serio ?');
                        throw { code: 'NotFound', message: 'Não pode ter mais de um cartão do mesmo tipo' };
                        //return res.status(401).send('Não pode ter mais de um cartão do mesmo tipo')
                    } //
                    return [2 /*return*/];
            }
        });
    });
}
export function verificaCard(body) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories.CardVerificaTipo(body)];
                case 1:
                    card = _a.sent();
                    console.log('oi9');
                    if (card.rows.length === 0) {
                        console.log('serio ?');
                        throw { code: 'NotFound', message: 'voce nao existe' };
                        //return res.status(401).send('Não pode ter mais de um cartão do mesmo tipo')
                    } //
                    return [2 /*return*/, card];
            }
        });
    });
}
export function salvarSenha(body) {
    return __awaiter(this, void 0, void 0, function () {
        var encryptedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    encryptedPassword = bcrypt.hashSync(body.senha, 10);
                    return [4 /*yield*/, repositories.salvarSenha(encryptedPassword, body)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function validarSenha(body, card) {
    return __awaiter(this, void 0, void 0, function () {
        var senha;
        return __generator(this, function (_a) {
            senha = bcrypt.compareSync(body.senha, card.rows[0].password);
            if (!senha) {
                console.log('senha invalida');
                //return res.status(420).send('voce nao existe')
                throw { code: 'NotFound', message: 'voce nao existe' };
            }
            return [2 /*return*/];
        });
    });
}
export function EstabelecimentosCadastrados(body) {
    return __awaiter(this, void 0, void 0, function () {
        var businesse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repositories.businesse(body)];
                case 1:
                    businesse = _a.sent();
                    console.log(businesse.rows[0]);
                    if (businesse.rows.length === 0) {
                        //return res.status(401).send('loja nao existe')
                        throw { code: 'NotFound', message: 'loja nao existe' };
                    }
                    return [2 /*return*/, businesse];
            }
        });
    });
}
export function EstabelecimentoTipo(card, businesse) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (businesse.rows[0].type != card.rows[0].type) {
                //return res.status(401).send('tipo de cartao invalido')
                throw { code: 'NotFound', message: 'tipo de cartao invalido' };
            }
            return [2 /*return*/];
        });
    });
}
