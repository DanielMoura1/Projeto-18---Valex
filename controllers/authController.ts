import { Request, Response } from "express";
import connection from '../dbStrategy/pg.js';
import joi from 'joi';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { Recharge } from "../repositories/rechargeRepository.js";
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
        const card =await connection.query('select * from cards where id =$1',[body.id])
        console.log(card.rows[0])
         //Somente cartões cadastrados devem ser ativados
         if(card.rows.length===0){
            return res.status(401).send('cartao nao existe')
        }
         //Somente cartões ativos devem ser
         if(card.rows[0].isBlocked===true){
            return res.status(401).send('cartao bloqueado')
         }
            //Somente cartões não expirados devem ser ativados
            const date = new Date();
            const hoje = date.toLocaleDateString();
            const time=hoje.split("/")
            const cardValidade =card.rows[0].expirationDate
            if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
                return res.status(401).send('cartao  fora da validade')
            }
            //- Cartões já ativados (com senha cadastrada) não devem poder ser ativados de novo
            
        if(card.rows[0].password===null){
            return res.status(401).send('cartao nao ativado')
        }
        //Somente cartões  bloqueados devem ser bloqueados
        if(card.rows[0].isBlocked===true){
            return res.status(401).send('cartao está bloqueado')
         }
          //validar senha
          const senha= bcrypt.compareSync(body.senha, card.rows[0].password)
        if(!senha){
          console.log('senha invalida')
          return res.status(420).send('voce nao existe')
        }
       
        //Somente estabelecimentos cadastrados devem poder transacionar
        const businesse =await connection.query('select * from businesses where id =$1',[body.idloja])
        console.log(businesse.rows[0])
         
         if(businesse.rows.length===0){
            return res.status(401).send('loja nao existe')
        }
        //Somente estabelecimentos do mesmo tipo do cartão devem poder transacionar com ele
        if(businesse.rows[0].type!=card.rows[0].type){
            return res.status(401).send('tipo de cartao invalido')
        }
        //O cartão deve possuir saldo suficiente para cobrir o montante da compra
        const recharges =await connection.query('select amount from recharges where "cardId" =$1',[body.id])
       
        const payments =await connection.query('select amount from payments where "cardId" =$1',[body.id])
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
        let timestamp = new Date();
        await connection.query(
            'INSERT INTO payments ("cardId",timestamp,amount,"businessId") VALUES ($1, $2, $3,$4)',
            [body.id,timestamp,body.valor,body.idloja])
        res.status(201).send('Cartao atualizado com sucesso!');
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
        const card =await connection.query('select * from cards where id =$1',[body.id])
        console.log(card.rows[0])
         //Somente cartões cadastrados devem ser ativados
         if(card.rows.length===0){
            return res.status(401).send('cartao nao existe')
        }
          //Somente cartões ativos devem ser
          if(card.rows[0].password===null){
            return res.status(401).send('cartao nao ativado')
        }
        //Somente cartões não expirados devem ser ativados
        const date = new Date();
        const hoje = date.toLocaleDateString();
        const time=hoje.split("/")
        const cardValidade =card.rows[0].expirationDate
        let timestamp = new Date();
        console.log(timestamp)
        if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
            return res.status(401).send('cartao fora da validade')
        }
        await connection.query(
            'INSERT INTO recharges ("cardId",timestamp,amount) VALUES ($1, $2, $3)',
            [body.id,timestamp,body.valor])
        res.status(201).send('Cartao atualizado com sucesso!');
    }catch(error){
        res.status(500).send(error)
    }
}
export async function cartaoDesBloqueiar(req:Request, res:Response) {
    const body =req.body
    console.log(body)
    try{
        const card =await connection.query('select * from cards where id =$1',[body.id])
        console.log(card.rows[0])
         //Somente cartões cadastrados devem ser ativados
         if(card.rows.length===0){
            return res.status(401).send('cartao nao existe')
        }
         //Somente cartões  bloqueados devem ser bloqueados
         if(card.rows[0].isBlocked===false){
            return res.status(401).send('cartao nao está bloqueado')
         }
           //Somente cartões não expirados devem ser ativados
           const date = new Date();
           const hoje = date.toLocaleDateString();
           const time=hoje.split("/")
           const cardValidade =card.rows[0].expirationDate
           if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
               return res.status(401).send('cartao  fora da validade')
           }
          //validar senha
          const senha= bcrypt.compareSync(body.senha, card.rows[0].password)
        if(!senha){
          console.log('senha invalida')
          return res.status(420).send('voce nao existe')
        }
        //
        await connection.query('UPDATE cards SET "isBlocked"=$1  WHERE id = $2;',[false,body.id])
        res.status(201).send('Cartao atualizado com sucesso!');
    }catch(error){
        res.status(500).send(error)
    }
}

export async function cartaoBloqueiar(req:Request, res:Response) {
    const body =req.body
    console.log(body)
    try{
        const card =await connection.query('select * from cards where id =$1',[body.id])
        console.log(card.rows[0])
         //Somente cartões cadastrados devem ser ativados
         if(card.rows.length===0){
            return res.status(401).send('cartao nao existe')
        }
         //Somente cartões não bloqueados devem ser bloqueados
         if(card.rows[0].isBlocked===true){
            return res.status(401).send('cartao ativo')
         }
           //Somente cartões não expirados devem ser ativados
           const date = new Date();
           const hoje = date.toLocaleDateString();
           const time=hoje.split("/")
           const cardValidade =card.rows[0].expirationDate
           if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
               return res.status(401).send('cartao  fora da validade')
           }
          //validar senha
          const senha= bcrypt.compareSync(body.senha, card.rows[0].password)
        if(!senha){
          console.log('senha invalida')
          return res.status(420).send('voce nao existe')
        }
        //
        await connection.query('UPDATE cards SET "isBlocked"=$1  WHERE id = $2;',[true,body.id])
        res.status(201).send('Cartao atualizado com sucesso!');
    }catch(error){
        res.status(500).send(error)
    }
}
export async function cartaoVisualizacao(req:Request, res:Response) {
    const body =req.body
    console.log(body)
    try{
        const card =await connection.query('select * from cards where id =$1',[body.id])
        console.log(card.rows[0])
         //Somente cartões cadastrados devem ser ativados
         if(card.rows.length===0){
            return res.status(401).send('cartao nao existe')
        }
       

        //
        
        console.log('oi')
        const recharges =await connection.query('select amount from recharges where "cardId" =$1',[body.id])
        console.log('oi')
        const payments =await connection.query('select amount from payments where "cardId" =$1',[body.id])
        let recharge:number =0
        let payment:number=0
        for(let i=0;i< recharges.rows.length;i++){
            recharge = recharge+recharges.rows[i].amount
        }
        for(let i=0;i< payments.rows.length;i++){
            payment = payment+payments.rows[i].amount
        }
        console.log(recharge-payment)
    }catch(error){
        res.status(500).send(error)
    }
    res.status(201).send('Cartao atualizado com sucesso!');
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
        const card =await connection.query('select * from cards where id =$1',[body.id])
        console.log(card.rows[0])
        //Somente cartões cadastrados devem ser ativados
        if(card.rows.length===0){
            return res.status(401).send('cartao nao existe')
        }
        //- Cartões já ativados (com senha cadastrada) não devem poder ser ativados de novo
        if(card.rows[0].password!=null){
            return res.status(401).send('cartao ja ativado')
        }
        //Somente cartões não expirados devem ser ativados
        const date = new Date();
        const hoje = date.toLocaleDateString();
        const time=hoje.split("/")
        const cardValidade =card.rows[0].expirationDate
        if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
            return res.status(401).send('cartao  fora da validade')
        }
        //O CVC deverá ser recebido e verificado para garantir a segurança da requisição
        if(body.cvc !=card.rows[0].securityCode){
            return res.status(401).send('cvc invalido')
        }
        //A senha do cartão deverá ser persistida de forma criptografado por ser um dado sensível
        const encryptedPassword = bcrypt.hashSync(body.senha, 10);
        console.log(encryptedPassword)
        //
        await connection.query('UPDATE cards SET password=$1  WHERE id = $2;',[encryptedPassword,body.id])
        await connection.query('UPDATE cards SET "originalCardId"=$1  WHERE id = $1;',[body.id])
        //UPDATE usuarios SET senh='010101' WHERE id = 2;
        res.status(201).send('Cartao atualizado com sucesso!');
    }catch(error){
        res.status(500).send(error)
    }
    //

}
export async function teste(req:Request, res:Response) {
    const { authorization } = req.headers;
    const token:string = authorization?.replace('Bearer ', '');
    const body =req.body
    const cardSchema = joi.object({
        "employeeId": joi.number().integer().required(),  
        "type": joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health')
    });
    
    const validation = cardSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send("oi XxxX oi");
    }
    try {
      
        //- A chave de API deve pertencer a alguma empresa
        const companie =await connection.query('select * from companies where "apiKey" =$1',[token])
        if(companie.rows.length===0){
            return res.status(401).send('key incorreta')
        }
        //- Somente empregados cadastrados podem ter cartões
        const employee =await connection.query('select * from employees where id =$1',[body.employeeId])
        if(employee.rows.length===0){
            return res.status(401).send('voce nao existe')
        }
        if(companie.rows[0].id !=employee.rows[0].companyId){
            return res.status(401).send('key incorreta')
        }
        //Empregados não podem ter mais de um cartão do mesmo tipo
        const card =await connection.query('select * from cards where "employeeId" =$1 AND type =$2',[body.employeeId,body.type])
        if(card.rows.length>0){
            return res.status(401).send('Não pode ter mais de um cartão do mesmo tipo')
        }//
       
        
        const date = new Date();
        const hoje = date.toLocaleDateString();
        const time=hoje.split("/")
        const DataDeValidade= time[1]+"/"+(parseInt(time[2])+5)
        console.log(DataDeValidade)
        const number = faker.random.numeric(16);
        const securityCode = faker.random.numeric(4)
        console.log(number)
        console.log(body)
        console.log(securityCode)
        const fullname =employee.rows[0].fullName.split(" ")
        const namec =fullname[0]+' '+fullname[(fullname[1].length >= 3 ? 1 : 2)][0]+' '+fullname[fullname.length-1]
        console.log(namec.toUpperCase())
        //
    
       
        await connection.query(
            'INSERT INTO cards ("employeeId",number,"cardholderName", "securityCode", "expirationDate",password,"isVirtual","originalCardId","isBlocked",type) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)',
            [employee.rows[0].id,number,namec.toUpperCase(),securityCode,DataDeValidade,null,true,null,false,body.type])
        
  
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.log('a')
        res.status(500).send(error)
    }
}
