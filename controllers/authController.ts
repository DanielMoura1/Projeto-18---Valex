import { Request, Response } from "express";
import connection from '../dbStrategy/pg.js';
import joi, { any } from 'joi';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import * as meu from '../servide2/meus.js';
import * as repositories from '../repositories/meusRepos.js';
import { Recharge } from "../repositories/rechargeRepository.js";
import { criarCartao} from "../service/criarCartao.js";
import { ativarCartao} from "../service/ativarCartao.js";
import { visualizacaoCartao} from "../service/visualizacaoCartao.js";
import { bloquearCartao} from "../service/bloquearCartao.js";
import { desbloquearCartao} from "../service/desbloquearCartao.js";
import { Timestamp } from "mongodb";
//const randomName = faker.name.findName(); // Willie Bahringer
//const randomEmail = faker.internet.email(); // Tomasa_Ferry14@hotmail.com
//var timestamp = new Date().getTime();
export async function compras(req:Request, res:Response) {
    const body =req.body
    console.log(body)
    const cardSchema = joi.object({
        "valor":joi.number().min(1).required(), 
        "id": joi.number().integer().required(),
        "idloja":joi.number().integer().required(),
        "senha":joi.string().length(4).pattern(/^[0-9]+$/).required()
    });
  
    
    const validation = cardSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send("oi XxxX oi");
    }
    try{
      
         const card =await meu.SomenteCartaoCadastrado(body)
       
        await meu.bloquear(card)
      
           await meu.verificaValidade(card)
      
           await meu.SomenteCartaoAtivo2(card)
        
         await meu.validarSenha(body,card)
        
        const businesse=await meu.EstabelecimentosCadastrados(body)
      
        await meu.EstabelecimentoTipo(card,businesse)
     
        const recharges =await repositories.recharges(body)
       
        const payments = await repositories.payments(body)
        
        let recharge:number =0
        let payment:number=0
        for(let i=0;i< recharges.rows.length;i++){
            recharge = recharge+recharges.rows[i].amount
        }
        
        for(let i=0;i< payments.rows.length;i++){
            payment = payment+payments.rows[i].amount
        }
        
        console.log(recharge-payment)
        const soma =recharge-payment
        if(body.valor>soma){
            return res.status(401).send('valor insuficiente')
        }
        let timestamp:any = new Date();
        await repositories.compras(timestamp,body)
  
        res.status(201).send('Cartao atualizado com sucessoq!');
    }catch(error){
        res.status(500).send(error)
    }
 
}
export async function recargas(req:Request, res:Response) {
    const body =req.body
    console.log(body)
    const cardSchema = joi.object({
        "valor":joi.number().min(1).required(), 
        "id": joi.number().integer().required()
    });
    
    const validation = cardSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send("oi XxxX oi");
    }
    try{
       
        const card =await meu.SomenteCartaoCadastrado(body)
        
          await meu.SomenteCartaoAtivo2(card)
          console.log('1')
      
        await meu.verificaValidade(card)
        console.log('2')
        const date = new Date();
        const hoje = date.toLocaleDateString();
        const time=hoje.split("/")
        const cardValidade =card.rows[0].expirationDate
        let timestamp:any = new Date();
        console.log(timestamp)
        if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
            return res.status(401).send('cartao fora da validade')
        }
        console.log('3')
        await repositories.recargas(timestamp,body)
        console.log('4')
            
        res.status(201).send('Cartao atualizado com sucesso!');
    }catch(error){
        res.status(500).send(error)
    }
}
export async function cartaoDesBloquear(req:Request, res:Response) {
    const body =req.body
    console.log(body)
    try{
       // await desbloquearCartao(body)
      
        const card =await meu.SomenteCartaoCadastrado(body)
        
        await meu.desbloquear(card)
       
        await meu.verificaValidade(card)
      
        await meu.validarSenha(body,card)
       
        await repositories.Desbloquear(body)
       
        res.status(201).send('Cartao atualizado com sucesso!');
    }catch(error){
        res.status(500).send(error)
    }
}

export async function cartaoBloquear(req:Request, res:Response) {
    const body =req.body
    console.log(body)
    try{
 
         const card =await meu.SomenteCartaoCadastrado(body)
     
        await meu.bloquear(card)
       
          await meu.verificaValidade(card)
       
          await meu.validarSenha(body,card)
      
        await repositories.Bloquear(body)
        res.status(201).send('Cartao atualizado com sucesso!');
    }catch(error){
        res.status(500).send(error)
    }
}
export async function cartaoVisualizacao(req:Request, res:Response) {
    const body =req.body
    console.log(body)
    try{
     
         const card =await meu.SomenteCartaoCadastrado(body)
      
        
        console.log('oi')
        const recharges =await repositories.recharges(body)
        console.log('oi')
        const payments =await repositories.payments(body)
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

        console.log(recharge-payment)
        
        res.status(201).send(resposta);
    }catch(error){
        res.status(500).send(error)
    }
   
}
export async function ativacaoCartao(req:Request, res:Response) {
    const body =req.body
    console.log(body)
    const cardSchema = joi.object({
        "senha":joi.string().length(4).pattern(/^[0-9]+$/).required(), 
        "id": joi.number().integer().required(),
        "cvc":joi.string().required()
    });
    
    const validation = cardSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send("oi XxxX oi");
    }
    try{
   
      
        const card =await meu.SomenteCartaoCadastrado(body)
        console.log('1')
      
        await meu.SomenteCartaoAtivo(card)
        console.log('2')
   
        await meu.verificaValidade(card)
        console.log('3')
      
       await meu.verificaCVC(card,body)
       await meu.salvarSenha(body)
    
      
        res.status(201).send('Cartao atualizado com sucesso!');
    }catch(error){
        res.status(500).send(error)
    }
  

}
export async function cardCreate(req:Request, res:Response) {
    const { authorization } = req.headers;
    const token:string = authorization?.replace('Bearer ', '');
    const body =req.body
    const cardSchema = joi.object({
        "id": joi.number().integer().required(),  
        "type": joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health')
    });
   
    const validation = cardSchema.validate(req.body);
   
    if (validation.error) {
        return res.status(422).send("oi XxxX oi");
    }
    try {
      
       
        const companie = await meu.verificaChave(token)
        console.log('1')
        
       const employee =await meu.SomenteEmpregadosCadastrado(body)
       console.log('22')
     
     
        await meu.verificaTipo(body)
       
        const date = new Date();
        const hoje = date.toLocaleDateString();
        const time=hoje.split("/")
        const number = faker.random.numeric(16);
        const securityCode = faker.random.numeric(4)
        const fullname =employee.rows[0].fullName.split(" ")
        const namec =fullname[0]+' '+fullname[(fullname[1].length >= 3 ? 1 : 2)][0]+' '+fullname[fullname.length-1]
        const DataDeValidade= time[1]+"/"+(parseInt(time[2])+5)
        const resposta ={
            employeeId:employee.rows[0].id,
            number:number,
            cardholderName:namec.toUpperCase(),
            securityCode:securityCode,
            expirationDate:DataDeValidade,
            password:null,
            isVirtual:true,
            originalCardId:null,
            isBlocked:false,
            type:body.type
       
        }
      
        await repositories.criarCartao(resposta)
      
           
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        
        res.status(500).send(error)
    }
}

