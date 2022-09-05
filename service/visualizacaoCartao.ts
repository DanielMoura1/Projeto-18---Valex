import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function visualizacaoCartao(body:any) {
    const card =await connection.query('select * from cards where id =$1',[body.id])
    console.log(card.rows[0])
     //Somente cartões cadastrados devem ser ativados
     if(card.rows.length===0){
       //return res.status(401).send('cartao nao existe')
        throw { code: 'NotFound', message: 'cartao nao existe' }
    }
   

    //
    
    console.log('oi')
    const recharges =await connection.query('select * from recharges where "cardId" =$1',[body.id])
    console.log('oi')
    const payments =await connection.query('select * from payments where "cardId" =$1',[body.id])
    let recharge:number =0
    let payment:number=0
    let paymentObject:any=[]
        let rechargeObject:any=[]
        for(let i=0;i< recharges.rows.length;i++){
            recharge = recharge+recharges.rows[i].amount
            rechargeObject.push(recharges.rows[i])
        }
        for(let i=0;i< payments.rows.length;i++){
            payment = payment+payments.rows[i].amount
            paymentObject.push(payments.rows[i])
        }
        const resposta ={
            "balance": recharge-payment,
            "transactions":paymentObject,
            "recharges":rechargeObject
          }
          return resposta
    console.log(recharge-payment)
}