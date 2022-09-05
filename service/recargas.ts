import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function recargas(body:any) {
    const card =await connection.query('select * from cards where id =$1',[body.id])
        console.log(card.rows[0])
         //Somente cartões cadastrados devem ser ativados
         if(card.rows.length===0){
            //return res.status(401).send('cartao nao existe')
            throw { code: 'NotFound', message: 'cartao nao existe' }
        }
          //Somente cartões ativos devem ser
          if(card.rows[0].password===null){
            //return res.status(401).send('cartao nao ativado')
            throw { code: 'NotFound', message: 'cartao bloquado' }
        }
        //Somente cartões não expirados devem ser ativados
        const date = new Date();
        const hoje = date.toLocaleDateString();
        const time=hoje.split("/")
        const cardValidade =card.rows[0].expirationDate
        let timestamp = new Date();
        console.log(timestamp)
        if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
            //return res.status(401).send('cartao fora da validade')
            throw { code: 'NotFound', message: 'cartao fora da validade' }
        }
        await connection.query(
            'INSERT INTO recharges ("cardId",timestamp,amount) VALUES ($1, $2, $3)',
            [body.id,timestamp,body.valor])
}