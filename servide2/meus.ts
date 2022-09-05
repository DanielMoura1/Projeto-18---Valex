import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function desbloquear(card:any) {
    if(card.rows[0].isBlocked===false){
        
        throw { code: 'NotFound', message: 'cartao nao está bloqueado' }
     }
}
export async function bloquear(card:any) {
    if(card.rows[0].isBlocked===true){
       
        throw { code: 'NotFound', message: 'cartao está bloqueado' }
     }
}
export async function SomenteEmpregadosCadastrado(body:any) {
    const employee =await repositories.employee(body)
 console.log('oi6')
 if(employee.rows.length===0){
     throw { code: 'NotFound', message: 'voce nao existe' }
    
 }
 return employee
}
export async function SomenteCartaoCadastrado(body:any) {
    const card =await repositories.card(body)
    if(card.rows.length===0){
       
        throw { code: 'NotFound', message:'cartao nao existe'}
    }
    return card
}
export async function SomenteCartaoAtivo(card:any) {
    if(card.rows[0].password!=null){
       
        throw { code: 'NotFound', message:'cartao ja ativado'}
    }

}
export async function SomenteCartaoAtivo2(card:any) {
    if(card.rows[0].password===null){
        throw { code: 'NotFound', message:'cartao nao ativado'}
    }
}
export async function verificaCVC(card:any,body:any) {
    if(body.cvc !=card.rows[0].securityCode){
       
        throw { code: 'NotFound', message:'cvc invalido'}
    }
}
export async function verificaSenha(card:any,body:any) {
    if(card.rows[0].password!=null){
        
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
   
    }
    return companie
}
export async function verificaTipo(body:any) {
    const card =await connection.query('select * from cards where "employeeId" =$1 AND type =$2',[body.id,body.type])
    console.log('oi9')
   
    if(card.rows.length>0){
        console.log('serio ?')
        throw { code: 'NotFound', message: 'Não pode ter mais de um cartão do mesmo tipo' }
      
    }
    
}
export async function verificaCard(body:any) {
    const card =await repositories.CardVerificaTipo(body)
    console.log('oi9')
   
    if(card.rows.length===0){
        console.log('serio ?')
        throw { code: 'NotFound', message: 'voce nao existe' }
        
    }//
    return card
}
export async function salvarSenha(body:any) {
    const encryptedPassword = bcrypt.hashSync(body.senha, 10);
    await repositories.salvarSenha(encryptedPassword,body)
  
}
export async function validarSenha(body:any,card:any) {
    const senha= bcrypt.compareSync(body.senha, card.rows[0].password)
    if(!senha){
      console.log('senha invalida')
      throw { code: 'NotFound', message: 'voce nao existe' }
    }
}
export async function EstabelecimentosCadastrados(body:any) {
    const businesse =await repositories.businesse(body)
    console.log(businesse.rows[0])
     
     if(businesse.rows.length===0){
       
        throw { code: 'NotFound', message: 'loja nao existe' }
    }
    return businesse
}
export async function EstabelecimentoTipo(card:any,businesse:any) {
    if(businesse.rows[0].type!=card.rows[0].type){
      
        throw { code: 'NotFound', message: 'tipo de cartao invalido' }
    }
}