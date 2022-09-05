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
import bcrypt from 'bcrypt';
export function desbloquearCartao(body) {
    return __awaiter(this, void 0, void 0, function () {
        var card, date, hoje, time, cardValidade, senha;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.query('select * from cards where id =$1', [body.id])];
                case 1:
                    card = _a.sent();
                    console.log(card.rows[0]);
                    //Somente cartões cadastrados devem ser ativados
                    if (card.rows.length === 0) {
                        //return res.status(401).send('cartao nao existe')
                        throw { code: 'NotFound', message: 'cartao nao existe' };
                    }
                    //Somente cartões  bloqueados devem ser bloqueados
                    if (card.rows[0].isBlocked === false) {
                        //return res.status(401).send('cartao nao está bloqueado')
                        throw { code: 'NotFound', message: 'cartao nao esta bloqueado' };
                    }
                    date = new Date();
                    hoje = date.toLocaleDateString();
                    time = hoje.split("/");
                    cardValidade = card.rows[0].expirationDate;
                    if (time[1] >= cardValidade[1] && time[0] > cardValidade[0]) {
                        //return res.status(401).send('cartao  fora da validade')
                        throw { code: 'NotFound', message: 'cartao  fora da validade' };
                    }
                    senha = bcrypt.compareSync(body.senha, card.rows[0].password);
                    if (!senha) {
                        console.log('senha invalida');
                        //return res.status(420).send('voce nao existe')
                        throw { code: 'NotFound', message: 'voce nao existe' };
                    }
                    //
                    return [4 /*yield*/, connection.query('UPDATE cards SET "isBlocked"=$1  WHERE id = $2;', [false, body.id])];
                case 2:
                    //
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
