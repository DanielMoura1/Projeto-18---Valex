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
import { faker } from '@faker-js/faker';
export function criarCartao(token, body) {
    return __awaiter(this, void 0, void 0, function () {
        var companie, employee, card, date, hoje, time, DataDeValidade, number, securityCode, fullname, namec, resposta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //- A chave de API deve pertencer a alguma empresa
                    console.log('oi');
                    return [4 /*yield*/, repositories.VerificarPertenceEmpresa(token)];
                case 1:
                    companie = _a.sent();
                    console.log(companie.length);
                    if (companie.length === 0) {
                        throw { code: 'NotFound', message: 'key incorreta' };
                        //return res.status(401).send('key incorreta')
                    }
                    console.log('oi4');
                    console.log('oi5');
                    return [4 /*yield*/, connection.query('select * from employees where id =$1', [body.employeeId])];
                case 2:
                    employee = _a.sent();
                    console.log('oi6');
                    if (employee.rows.length === 0) {
                        throw { code: 'NotFound', message: 'voce nao existe' };
                        //return res.status(401).send('voce nao existe')
                    }
                    console.log('oi7');
                    if (companie[0].id != employee.rows[0].companyId) {
                        throw { code: 'NotFound', message: 'key incorreta' };
                        //return res.status(401).send('key incorreta')
                    }
                    console.log('oi8');
                    return [4 /*yield*/, connection.query('select * from cards where "employeeId" =$1 AND type =$2', [body.employeeId, body.type])];
                case 3:
                    card = _a.sent();
                    console.log('oi9');
                    if (card.rows.length > 0) {
                        throw { code: 'NotFound', message: 'Não pode ter mais de um cartão do mesmo tipo' };
                        //return res.status(401).send('Não pode ter mais de um cartão do mesmo tipo')
                    } //
                    console.log('oi10');
                    date = new Date();
                    hoje = date.toLocaleDateString();
                    time = hoje.split("/");
                    DataDeValidade = time[1] + "/" + (parseInt(time[2]) + 5);
                    console.log(DataDeValidade);
                    number = faker.random.numeric(16);
                    securityCode = faker.random.numeric(4);
                    console.log(number);
                    console.log(body);
                    console.log(securityCode);
                    fullname = employee.rows[0].fullName.split(" ");
                    namec = fullname[0] + ' ' + fullname[(fullname[1].length >= 3 ? 1 : 2)][0] + ' ' + fullname[fullname.length - 1];
                    console.log(namec.toUpperCase());
                    //
                    console.log('oi11');
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
                    return [2 /*return*/, resposta];
            }
        });
    });
}
