import { Timestamp } from "mongodb";
import { connection } from "../database.js";

export async function VerificarPertenceEmpresa(token: string) {
    
     //- A chave de API deve pertencer a alguma empresa
    const companie =await connection.query('select * from companies where "apiKey" =$1',[token])

return companie.rows;
}
export async function criarCartao(resposta:any) {
    await connection.query(
        'INSERT INTO cards ("employeeId",number,"cardholderName", "securityCode", "expirationDate",password,"isVirtual","originalCardId","isBlocked",type) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)',
        [resposta.employeeId,resposta.number,resposta.cardholderName,resposta.securityCode,resposta.expirationDate,resposta.password,resposta.isVirtual,resposta.originalCardId,resposta.isBlocked,resposta.type])

}
export async function recharges(body:any) {
    const recharges =await connection.query('select amount from recharges where "cardId" =$1',[body.id])
    return recharges
}
export async function payments(body:any) {
const payments =await connection.query('select amount from payments where "cardId" =$1',[body.id])
return payments
}
export async function Bloquear(body:any) {
    await connection.query('UPDATE cards SET "isBlocked"=$1  WHERE id = $2;',[true,body.id])
        
}
export async function Desbloquear(body:any) {
    await connection.query('UPDATE cards SET "isBlocked"=$1  WHERE id = $2;',[false,body.id])
        
}
export async function recargas(timestamp:Timestamp,body:any) {
    await connection.query(
        'INSERT INTO recharges ("cardId",timestamp,amount) VALUES ($1, $2, $3)',
        [body.id,timestamp,body.valor])
}
export async function compras(timestamp:Timestamp,body:any) {
    await connection.query(
        'INSERT INTO payments ("cardId",timestamp,amount,"businessId") VALUES ($1, $2, $3,$4)',
        [body.id,timestamp,body.valor,body.idloja])
}
export async function employee(body:any) {
    const employee =await connection.query('select * from employees where id =$1',[body.id])
    return employee
}
export async function card(body:any) {
    const card =await connection.query('select * from cards where id =$1',[body.id])
    return card
}
export async function CardVerificaTipo(body:any) {
    const card =await connection.query('select * from cards where "employeeId" =$1 AND type =$2',[body.id,body.type])
    return card
}
export async function salvarSenha(encryptedPassword:string,body:any) {
    await connection.query('UPDATE cards SET password=$1  WHERE id = $2;',[encryptedPassword,body.id])
        await connection.query('UPDATE cards SET "originalCardId"=$1  WHERE id = $1;',[body.id])
}
export async function businesse(body:any) {
    const businesse =await connection.query('select * from businesses where id =$1',[body.idloja])
    return  businesse
}


