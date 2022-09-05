import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function desbloquear(card:any) {
    if(card.rows[0].isBlocked===false){
        //return res.status(401).send('cartao nao está bloqueado')
        throw { code: 'NotFound', message: 'cartao nao está bloqueado' }
     }
}
export async function bloquear(card:any) {
    if(card.rows[0].isBlocked===true){
        //return res.status(401).send('cartao ja está bloqueado')
        throw { code: 'NotFound', message: 'cartao ja está bloqueado' }
     }
}
export async function SomenteEmpregadosCadastrado(body:any) {
    const employee =await connection.query('select * from employees where id =$1',[body.id])
 console.log('oi6')
 if(employee.rows.length===0){
     throw { code: 'NotFound', message: 'voce nao existe' }
     //return res.status(401).send('voce nao existe')
 }
 return employee
}
export async function SomenteCartaoCadastrado(body:any) {
    const card =await connection.query('select * from cards where id =$1',[body.id])
    if(card.rows.length===0){
        //return res.status(401).send('cartao nao existe')
        throw { code: 'NotFound', message:'cartao nao existe'}
    }
    return card
}
export async function SomenteCartaoAtivo(card:any) {
    if(card.rows[0].password!=null){
        //return res.status(401).send('cartao ja ativado')
        throw { code: 'NotFound', message:'cartao ja ativado'}
    }

}
export async function verificaCVC(card:any,body:any) {
    if(body.cvc !=card.rows[0].securityCode){
        //return res.status(401).send('cvc invalido')
        throw { code: 'NotFound', message:'cvc invalido'}
    }
}
export async function verificaSenha(card:any,body:any) {
    if(card.rows[0].password!=null){
        //return res.status(401).send('cartao ja ativado')
        throw { code: 'NotFound', message: 'cartao ja ativado' }
    }
}
export async function verificaValidade(card:any) {
    console.log('::??')
    const date = new Date();
    const hoje = date.toLocaleDateString();
    const time=hoje.split("/")
    const DataDeValidade= time[1]+"/"+(parseInt(time[2])+5)
    console.log(card.rows)
    const cardValidade =card.rows[0].expirationDate
    console.log('_-')
    if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
        //return res.status(401).send('cartao  fora da validade')
        throw { code: 'NotFound', message:'cartao  fora da validade'}
    }
    console.log('_-aff')
    return DataDeValidade

}
export async function verificaChave(token:string) {
    const companie =await repositories.VerificarPertenceEmpresa(token)
    console.log(companie.length)
    if(companie.length===0){
     throw { code: 'NotFound', message: 'key incorreta' }
     //return res.status(401).send('key incorreta')
    }
    return companie
}
export async function verificaTipo(body:any) {
    const card =await connection.query('select * from cards where "employeeId" =$1 AND type =$2',[body.id,body.type])
    console.log('oi9')
   
    if(card.rows.length>0){
        console.log('serio ?')
        throw { code: 'NotFound', message: 'Não pode ter mais de um cartão do mesmo tipo' }
        //return res.status(401).send('Não pode ter mais de um cartão do mesmo tipo')
    }//
    
}
export async function verificaCard(body:any) {
    const card =await connection.query('select * from cards where "employeeId" =$1 AND type =$2',[body.id,body.type])
    console.log('oi9')
   
    if(card.rows.length===0){
        console.log('serio ?')
        throw { code: 'NotFound', message: 'voce nao existe' }
        //return res.status(401).send('Não pode ter mais de um cartão do mesmo tipo')
    }//
    return card
}
export async function salvarSenha(body:any) {
    const encryptedPassword = bcrypt.hashSync(body.senha, 10);
    await connection.query('UPDATE cards SET password=$1  WHERE id = $2;',[encryptedPassword,body.id])
        await connection.query('UPDATE cards SET "originalCardId"=$1  WHERE id = $1;',[body.id])
}
export async function validarSenha(body:any,card:any) {
    const senha= bcrypt.compareSync(body.senha, card.rows[0].password)
    if(!senha){
      console.log('senha invalida')
      //return res.status(420).send('voce nao existe')
      throw { code: 'NotFound', message: 'voce nao existe' }
    }
}