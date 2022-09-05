import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function desbloquearCartao(body:any) {
    const card =await connection.query('select * from cards where id =$1',[body.id])
        console.log(card.rows[0])
         //Somente cartões cadastrados devem ser ativados
         if(card.rows.length===0){
            //return res.status(401).send('cartao nao existe')
            throw { code: 'NotFound', message: 'cartao nao existe' }
        }
         //Somente cartões  bloqueados devem ser bloqueados
         if(card.rows[0].isBlocked===false){
            //return res.status(401).send('cartao nao está bloqueado')
            throw { code: 'NotFound', message: 'cartao nao esta bloqueado' }
         }
           //Somente cartões não expirados devem ser ativados
           const date = new Date();
           const hoje = date.toLocaleDateString();
           const time=hoje.split("/")
           const cardValidade =card.rows[0].expirationDate
           if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
               //return res.status(401).send('cartao  fora da validade')
               throw { code: 'NotFound', message: 'cartao  fora da validade' }
           }
          //validar senha
          const senha= bcrypt.compareSync(body.senha, card.rows[0].password)
        if(!senha){
          console.log('senha invalida')
          //return res.status(420).send('voce nao existe')
          throw { code: 'NotFound', message: 'voce nao existe' }
        }
        //
        await connection.query('UPDATE cards SET "isBlocked"=$1  WHERE id = $2;',[false,body.id])
}